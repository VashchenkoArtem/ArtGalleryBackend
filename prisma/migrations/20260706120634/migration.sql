/*
  Warnings:

  - You are about to alter the column `title` on the `Picture` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(35)`.
  - Added the required column `orientation` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "orientation" VARCHAR(15) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(35);
