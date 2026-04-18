import type { APIRoute } from 'astro';
import { db } from '../../db/index.server';
import { users, registrations } from '../../db/schema';
import { eq, and } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { 
      fullName, 
      email, 
      phone, 
      instagram, 
      competitionId,
      transactionId,
      paymentStatus
    } = data;

    if (!email || !competitionId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Find or create user
    let user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase())
    });

    // Split fullName into first and last name for the new DB schema
    const nameParts = (fullName || 'User').trim().split(/\s+/);
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '.';

    if (!user) {
      const insertedUsers = await db.insert(users).values({
        email: email.toLowerCase(),
        phone,
        firstName,
        lastName,
        fullName,
      }).returning();
      user = insertedUsers[0];
    } else {
      // Update phone or name if provided
      await db.update(users)
        .set({ 
          phone, 
          firstName, 
          lastName, 
          fullName,
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id));
    }

    // 2. Create the registration
    // We check if they are already registered for this competition
    const existingRegistration = await db.query.registrations.findFirst({
      where: and(
        eq(registrations.userId, user.id),
        eq(registrations.competitionId, competitionId)
      )
    });

    if (existingRegistration) {
      return new Response(JSON.stringify({ 
        message: 'Already registered', 
        registrationId: existingRegistration.id 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const insertedRegistrations = await db.insert(registrations).values({
      userId: user.id,
      competitionId: competitionId,
      instagramHandle: instagram,
      paymentStatus: paymentStatus || 'pending',
      transactionId: transactionId,
    }).returning();

    return new Response(JSON.stringify({ 
      success: true, 
      registrationId: insertedRegistrations[0].id 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Registration API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
