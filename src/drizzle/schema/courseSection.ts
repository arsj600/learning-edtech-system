import { integer,pgEnum, pgTable, timestamp,text, uuid } from "drizzle-orm/pg-core"
import { CourseTable } from "./course"
import { relations } from "drizzle-orm"
import { LessonTable } from "./lesson"

export const courseSectionStatuses = ["public", "private"] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
)

export const CourseSectionTable = pgTable("course_sections", {
      id:uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
      updatedAt:timestamp({withTimezone:true})
      .notNull().defaultNow().$onUpdate(()=>new Date()),
  
})

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ many, one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
    lessons: many(LessonTable),
  })
)