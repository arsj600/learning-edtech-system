import { pgTable, primaryKey, uuid,timestamp } from "drizzle-orm/pg-core"

import { relations } from "drizzle-orm"
import { UserTable } from "./user"
import { CourseTable } from "./course"

export const UserCourseAccessTable = pgTable(
  "user_course_access",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "cascade" }),
         createdAt:timestamp({withTimezone:true}).notNull().defaultNow(),
            updatedAt:timestamp({withTimezone:true})
            .notNull().defaultNow().$onUpdate(()=>new Date()),
        
  },
  t => [primaryKey({ columns: [t.userId, t.courseId] })]
)

export const UserCourseAccessRelationships = relations(
  UserCourseAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseAccessTable.userId],
      references: [UserTable.id],
    }),
    course: one(CourseTable, {
      fields: [UserCourseAccessTable.courseId],
      references: [CourseTable.id],
    }),
  })
)