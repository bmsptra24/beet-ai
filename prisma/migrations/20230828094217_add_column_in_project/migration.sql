/*
  Warnings:

  - You are about to drop the column `livestreamingKey` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "livestreamingKey",
ADD COLUMN     "aiKnowlagge" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "avatarName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "livestreamTopic" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "livestreamingId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mood" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "platform" TEXT NOT NULL DEFAULT '';
