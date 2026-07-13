import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import * as z from "zod";
import { db } from "@/db";
import { users, registrations } from "@/db/schema";

// Server-side validation schema
const registerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  instagram: z.string().min(2).max(40).regex(/^@?[a-zA-Z0-9._]+$/),
  competitionId: z.number(),
  paymentStatus: z.enum(["pending", "paid"]),
  transactionId: z.string().max(50).optional(),
});

// Simple in-memory rate limiting map
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    // 1. Basic rate limiting based on IP address
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const limitInfo = ipRateLimit.get(ip);

    if (limitInfo) {
      if (now > limitInfo.resetAt) {
        ipRateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      } else if (limitInfo.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many registration attempts. Please wait a minute and try again." },
          { status: 429 }
        );
      } else {
        limitInfo.count += 1;
      }
    } else {
      ipRateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse and validate JSON request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 });
    }

    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed on the server", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      instagram,
      competitionId,
      transactionId,
      paymentStatus,
    } = parseResult.data;

    const normalizedEmail = email.toLowerCase().trim();

    // 3. Find or create user
    let user = await db.query.users.findFirst({
      where: eq(users.email, normalizedEmail),
    });

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || ".";

    if (!user) {
      const insertedUsers = await db
        .insert(users)
        .values({
          email: normalizedEmail,
          phone: phone.trim(),
          firstName,
          lastName,
          fullName: fullName.trim(),
        })
        .returning();
      user = insertedUsers[0];
    } else {
      // Update phone or name if provided
      await db
        .update(users)
        .set({
          phone: phone.trim(),
          firstName,
          lastName,
          fullName: fullName.trim(),
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));
    }

    // 4. Check for duplicate registration
    const existingRegistration = await db.query.registrations.findFirst({
      where: and(
        eq(registrations.userId, user.id),
        eq(registrations.competitionId, competitionId)
      ),
    });

    if (existingRegistration) {
      // If already registered but they paid and want to update transactionId
      if (
        paymentStatus === "paid" &&
        existingRegistration.paymentStatus !== "paid" &&
        transactionId
      ) {
        await db
          .update(registrations)
          .set({
            paymentStatus: "paid",
            transactionId: transactionId.trim(),
          })
          .where(eq(registrations.id, existingRegistration.id));

        return NextResponse.json({
          success: true,
          message: "Payment details updated successfully",
          registrationId: existingRegistration.id,
        });
      }

      return NextResponse.json(
        {
          error: "You are already registered for this competition.",
          registrationId: existingRegistration.id,
        },
        { status: 409 }
      );
    }

    // 5. Insert new registration record
    const insertedRegistrations = await db
      .insert(registrations)
      .values({
        userId: user.id,
        competitionId,
        instagramHandle: instagram.trim(),
        paymentStatus,
        transactionId: transactionId?.trim() || null,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        registrationId: insertedRegistrations[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/register error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
