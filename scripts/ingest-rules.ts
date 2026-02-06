import fs from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ingest() {
  const filePath = path.join(process.cwd(), "data", "rules", "runas-e-ferro.md");
  const content = await fs.readFile(filePath, "utf-8");

  const rulePage = await prisma.rulePage.upsert({
    where: { slug: "livro-basico" },
    update: { content },
    create: {
      slug: "livro-basico",
      title: "Runas e Ferro — Livro Básico v2.0",
      content
    }
  });

  const sections = content.split("\n## ");
  const indexEntries = sections.slice(1).map((section) => {
    const [headingLine, ...rest] = section.split("\n");
    return {
      rulePageId: rulePage.id,
      heading: headingLine.trim(),
      content: rest.join("\n").slice(0, 1200)
    };
  });

  await prisma.ruleIndex.deleteMany({ where: { rulePageId: rulePage.id } });
  await prisma.ruleIndex.createMany({ data: indexEntries });
}

ingest()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
