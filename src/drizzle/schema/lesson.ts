import { pgTable, text, uuid, integer,timestamp, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { CourseSectionTable } from "./courseSection"
import { UserLessonCompleteTable } from "./userLessonComplete"

export const lessonStatuses = ["public", "private", "preview"] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses)

export const LessonTable = pgTable("lessons", {
        id:uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: "cascade" }),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
        updatedAt:timestamp({withTimezone:true})
        .notNull().defaultNow().$onUpdate(()=>new Date()),
    
})

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
  userLessonsComplete: many(UserLessonCompleteTable),
}))