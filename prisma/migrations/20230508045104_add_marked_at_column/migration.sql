/*
  Warnings:

  - Added the required column `markedAt` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "markedAt" TIMESTAMP(3) NOT NULL;
