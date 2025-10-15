import { pgTable, primaryKey, uuid,timestamp } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { LessonTable } from "./lesson"

export const UserLessonCompleteTable = pgTable(
  "user_lesson_complete",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    lessonId: uuid()
      .notNull()
      .references(() => LessonTable.id, { onDelete: "cascade" }),
    createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
            updatedAt:timestamp({withTimezone:true})
            .notNull().defaultNow().$onUpdate(()=>new Date()),
        
  },
  t => [primaryKey({ columns: [t.userId, t.lessonId] })]
)

export const UserLessonCompleteRelationships = relations(
  UserLessonCompleteTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserLessonCompleteTable.userId],
      references: [UserTable.id],
    }),
    lesson: one(LessonTable, {
      fields: [UserLessonCompleteTable.lessonId],
      references: [LessonTable.id],
    }),
  })
)