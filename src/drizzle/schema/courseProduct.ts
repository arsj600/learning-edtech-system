import { pgTable,uuid,primaryKey,timestamp, } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { relations } from "drizzle-orm";

export const CourseProductTable =pgTable(
    "course-product",
    {
    courseId:uuid().notNull()
    .references(()=>CourseTable.id,{onDelete:"restrict"}),
    productId:uuid().notNull().references(()=>ProductTable.id,{onDelete:"cascade"}),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
        updatedAt:timestamp({withTimezone:true})
        .notNull().defaultNow().$onUpdate(()=>new Date()),
    
},
t=>[primaryKey({columns:[t.courseId,t.productId]})])

export const CourseProductRelationships=relations(CourseProductTable,({one})=>({
    course:one(CourseTable,{
        fields:[CourseProductTable.courseId],
        references:[CourseTable.id],
    }),
    product:one(ProductTable,{
        fields:[CourseProductTable.productId],
        references:[ProductTable.id],
    }),
})
)