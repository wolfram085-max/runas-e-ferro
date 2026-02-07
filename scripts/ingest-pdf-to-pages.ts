import fs from "node:fs/promises";
import path from "node:path";
import pdf from "pdf-parse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ingestPdf() {
  const pdfPath = path.join(
    process.cwd(),
    "assets",
    "runas_e_ferro_livro_basico_v2.pdf"
  );

  try {
    const data = await fs.readFile(pdfPath);
    const parsed = await pdf(data);
    const text = parsed.text.replace(/\r/g, "");
    const sections = text.split(/\n(?=\d+\. )/g).filter(Boolean);

    for (const section of sections) {
      const title = section.split("\n")[0]?.trim() ?? "Seção";
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      await prisma.rulePage.upsert({
        where: { slug },
        update: { content: section },
        create: { slug, title, content: section }
      });
    }

    console.log(`Ingestão concluída: ${sections.length} páginas.`);
  } catch (error) {
    console.warn(
      "PDF não encontrado ou erro de leitura. Coloque o arquivo em /assets/runas_e_ferro_livro_basico_v2.pdf."
    );
    console.error(error);
  }
}

ingestPdf()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
