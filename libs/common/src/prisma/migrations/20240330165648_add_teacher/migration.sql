/*
  Warnings:

  - A unique constraint covering the columns `[fullName,classId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "classId" INTEGER,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_classId_key" ON "Teacher"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_fullName_classId_key" ON "Teacher"("fullName", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_fullName_classId_key" ON "Student"("fullName", "classId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
