-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classId" INTEGER,
    "teacherId" INTEGER,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_classId_key" ON "Subject"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_teacherId_key" ON "Subject"("teacherId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
