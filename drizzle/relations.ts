import { relations } from "drizzle-orm/relations";
import { users, refreshTokens, fcmTokens, reviews, addonPurchases, subscriptions, membershipPlans } from "./schema";

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
	user: one(users, {
		fields: [refreshTokens.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	refreshTokens: many(refreshTokens),
	fcmTokens: many(fcmTokens),
	reviews_reviewerId: many(reviews, {
		relationName: "reviews_reviewerId_users_id"
	}),
	reviews_revieweeId: many(reviews, {
		relationName: "reviews_revieweeId_users_id"
	}),
	addonPurchases: many(addonPurchases),
	subscriptions: many(subscriptions),
}));

export const fcmTokensRelations = relations(fcmTokens, ({one}) => ({
	user: one(users, {
		fields: [fcmTokens.userId],
		references: [users.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	user_reviewerId: one(users, {
		fields: [reviews.reviewerId],
		references: [users.id],
		relationName: "reviews_reviewerId_users_id"
	}),
	user_revieweeId: one(users, {
		fields: [reviews.revieweeId],
		references: [users.id],
		relationName: "reviews_revieweeId_users_id"
	}),
}));

export const addonPurchasesRelations = relations(addonPurchases, ({one}) => ({
	user: one(users, {
		fields: [addonPurchases.userId],
		references: [users.id]
	}),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	user: one(users, {
		fields: [subscriptions.userId],
		references: [users.id]
	}),
	membershipPlan: one(membershipPlans, {
		fields: [subscriptions.planId],
		references: [membershipPlans.id]
	}),
}));

export const membershipPlansRelations = relations(membershipPlans, ({many}) => ({
	subscriptions: many(subscriptions),
}));