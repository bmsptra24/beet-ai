-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "lastOpenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "language" SET DEFAULT 'english',
ALTER COLUMN "mood" SET DEFAULT 'happy',
ALTER COLUMN "platform" SET DEFAULT 'youtube';
