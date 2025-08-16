import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const packingLists = pgTable("packing_lists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  cruiseName: text("cruise_name"),
  departureDate: text("departure_date"),
  cruiseLength: text("cruise_length"),
  destinations: text("destinations"),
  cabinType: text("cabin_type"),
  weather: text("weather"),
  items: jsonb("items").notNull().default('{}'),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const PackingItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  subcategory: z.string().optional(),
  checked: z.boolean().default(false),
  quantity: z.number().min(0).default(1),
  isCustom: z.boolean().default(false),
});

export const PackingListItemsSchema = z.record(z.string(), PackingItemSchema);

export const insertPackingListSchema = createInsertSchema(packingLists).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  items: PackingListItemsSchema,
});

export type InsertPackingList = z.infer<typeof insertPackingListSchema>;
export type PackingList = typeof packingLists.$inferSelect;
export type PackingItem = z.infer<typeof PackingItemSchema>;
