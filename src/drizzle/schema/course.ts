
import { relations } from "drizzle-orm";
import { pgTable,uuid,text,timestamp } from "drizzle-orm/pg-core";
import { CourseProductTable } from "./courseProduct";
import { UserCourseAccessTable } from "./userCourseAccess"
import { CourseSectionTable } from "./courseSection"


export const CourseTable =pgTable("courses",{
    id:uuid().primaryKey().defaultRandom(),
    name:text().notNull(),
    description:text().notNull(),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp({withTimezone:true})
    .notNull().defaultNow().$onUpdate(()=>new Date()),
})

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
  userCourseAccesses: many(UserCourseAccessTable),
  courseSections: many(CourseSectionTable),
}))