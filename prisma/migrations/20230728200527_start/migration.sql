-- CreateEnum
CREATE TYPE "tiposPortugol" AS ENUM ('inteiro', 'real', 'cadeia', 'caracter', 'logico');

-- CreateTable
CREATE TABLE "exercice" (
    "id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "entries" "tiposPortugol"[],
    "edgeCases" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
