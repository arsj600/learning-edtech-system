
import { relations } from "drizzle-orm";
import { pgTable,integer,uuid,text,timestamp, pgEnum } from "drizzle-orm/pg-core";
import { CourseProductTable } from "./courseProduct";

export const productStatuses=["public","private"] as const
export type ProductStatus=(typeof productStatuses)[number]
export const productStatusEnum=pgEnum("product_status",productStatuses)

export const ProductTable =pgTable("products",{
    id:uuid().primaryKey().defaultRandom(),
    name:text().notNull(),
    description:text().notNull(),
    imageUrl:text().notNull(),
    priceInRupee:integer().notNull(),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp({withTimezone:true})
    .notNull().defaultNow().$onUpdate(()=>new Date()),
})

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}))