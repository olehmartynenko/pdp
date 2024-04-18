/*
  Warnings:

  - A unique constraint covering the columns `[name,classId,teacherId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subject_classId_key";

-- DropIndex
DROP INDEX "Subject_teacherId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_classId_teacherId_key" ON "Subject"("name", "classId", "teacherId");
