-- Create enums
CREATE TYPE "CampaignRole" AS ENUM ('MESTRE', 'JOGADOR');
CREATE TYPE "SessionStatus" AS ENUM ('AGENDADA', 'EM_ANDAMENTO', 'ENCERRADA');

-- Create tables
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "image" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,

  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Session" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Campaign" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "tone" TEXT NOT NULL,
  "mapUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CampaignMember" (
  "id" TEXT NOT NULL,
  "role" "CampaignRole" NOT NULL,
  "campaignId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CampaignMember_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Character" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "campaignId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "level" INTEGER NOT NULL,
  "className" TEXT NOT NULL,
  "race" TEXT NOT NULL,
  "attributes" JSONB NOT NULL,
  "skills" JSONB NOT NULL,
  "feats" JSONB NOT NULL,
  "equipment" JSONB NOT NULL,
  "runes" JSONB NOT NULL,
  "conditions" JSONB NOT NULL,
  "maxHp" INTEGER NOT NULL,
  "maxFoc" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CharacterAuditLog" (
  "id" TEXT NOT NULL,
  "characterId" TEXT NOT NULL,
  "change" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "CharacterAuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GameSession" (
  "id" TEXT NOT NULL,
  "campaignId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "notes" TEXT NOT NULL,
  "scheduledAt" TIMESTAMP(3) NOT NULL,
  "status" "SessionStatus" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SessionParticipant" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "characterId" TEXT NOT NULL,

  CONSTRAINT "SessionParticipant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RoomMessage" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "sender" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "RoomMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DiceRoll" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "roller" TEXT NOT NULL,
  "formula" TEXT NOT NULL,
  "result" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "DiceRoll_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CombatState" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "initiative" JSONB NOT NULL,
  "activeTurn" INTEGER NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CombatState_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CharacterState" (
  "id" TEXT NOT NULL,
  "characterId" TEXT NOT NULL,
  "currentHp" INTEGER NOT NULL,
  "currentFoc" INTEGER NOT NULL,
  "conditions" JSONB NOT NULL,

  CONSTRAINT "CharacterState_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Handout" (
  "id" TEXT NOT NULL,
  "campaignId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Handout_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RulePage" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "RulePage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RuleIndex" (
  "id" TEXT NOT NULL,
  "rulePageId" TEXT NOT NULL,
  "heading" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "embedding" JSONB,

  CONSTRAINT "RuleIndex_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AiSummary" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "shortText" TEXT NOT NULL,
  "longText" TEXT NOT NULL,
  "narratedText" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "AiSummary_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "CampaignMember_campaignId_userId_key" ON "CampaignMember"("campaignId", "userId");
CREATE UNIQUE INDEX "CombatState_sessionId_key" ON "CombatState"("sessionId");
CREATE UNIQUE INDEX "CharacterState_characterId_key" ON "CharacterState"("characterId");
CREATE UNIQUE INDEX "RulePage_slug_key" ON "RulePage"("slug");

-- Foreign keys
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "CampaignMember" ADD CONSTRAINT "CampaignMember_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE;
ALTER TABLE "CampaignMember" ADD CONSTRAINT "CampaignMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "Character" ADD CONSTRAINT "Character_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE;
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "CharacterAuditLog" ADD CONSTRAINT "CharacterAuditLog_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE;
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE;
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE;
ALTER TABLE "RoomMessage" ADD CONSTRAINT "RoomMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;
ALTER TABLE "DiceRoll" ADD CONSTRAINT "DiceRoll_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;
ALTER TABLE "CombatState" ADD CONSTRAINT "CombatState_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;
ALTER TABLE "CharacterState" ADD CONSTRAINT "CharacterState_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE;
ALTER TABLE "Handout" ADD CONSTRAINT "Handout_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE;
ALTER TABLE "RuleIndex" ADD CONSTRAINT "RuleIndex_rulePageId_fkey" FOREIGN KEY ("rulePageId") REFERENCES "RulePage"("id") ON DELETE CASCADE;
ALTER TABLE "AiSummary" ADD CONSTRAINT "AiSummary_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE;
