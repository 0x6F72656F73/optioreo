/*
  Warnings:

  - You are about to drop the column `markedAt` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "markedAt",
ADD COLUMN     "marked" BOOLEAN NOT NULL DEFAULT false;
