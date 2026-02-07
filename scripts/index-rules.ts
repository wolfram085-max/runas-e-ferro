import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function indexRules() {
  const pages = await prisma.rulePage.findMany();

  for (const page of pages) {
    const sections = page.content.split("\n## ");
    const entries = sections.slice(1).map((section) => {
      const [headingLine, ...rest] = section.split("\n");
      return {
        rulePageId: page.id,
        heading: headingLine.trim(),
        content: rest.join("\n").slice(0, 1200)
      };
    });

    await prisma.ruleIndex.deleteMany({ where: { rulePageId: page.id } });
    if (entries.length) {
      await prisma.ruleIndex.createMany({ data: entries });
    }
  }

  console.log("Índice de regras atualizado.");
}

indexRules()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
