-- Add password hash to users
ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT;

-- Create MediaType enum
CREATE TYPE "MediaType" AS ENUM ('RACE', 'MONSTER', 'BANNER');

-- Create SessionSummary
CREATE TABLE "SessionSummary" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "shortMd" TEXT NOT NULL,
  "longMd" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "SessionSummary_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SessionSummary_sessionId_key" ON "SessionSummary"("sessionId");
ALTER TABLE "SessionSummary" ADD CONSTRAINT "SessionSummary_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;

-- Create WikiPage
CREATE TABLE "WikiPage" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "tags" JSONB NOT NULL,
  "contentMdx" TEXT NOT NULL,
  "imageUrl" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "WikiPage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WikiPage_slug_key" ON "WikiPage"("slug");

-- Create MediaAsset
CREATE TABLE "MediaAsset" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "type" "MediaType" NOT NULL,
  "url" TEXT NOT NULL,
  "thumbUrl" TEXT NOT NULL,
  "prompt" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MediaAsset_slug_key" ON "MediaAsset"("slug");
