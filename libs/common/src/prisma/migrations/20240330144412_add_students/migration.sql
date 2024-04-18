-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_fullName_key" ON "Student"("fullName");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
