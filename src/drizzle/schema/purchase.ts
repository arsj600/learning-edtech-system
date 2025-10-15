import {  pgTable,integer,jsonb, uuid,text,  timestamp,} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { ProductTable } from "./product"

export const PurchaseTable = pgTable("purchases", {
          id:uuid().primaryKey().defaultRandom(),
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => ProductTable.id, { onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
        updatedAt:timestamp({withTimezone:true})
        .notNull().defaultNow().$onUpdate(()=>new Date()),
    
})

export const PurchaseRelationships = relations(PurchaseTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PurchaseTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [PurchaseTable.productId],
    references: [ProductTable.id],
  }),
}))