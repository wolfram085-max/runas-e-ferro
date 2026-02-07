import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const races = [
  "ferrineos",
  "umbromar",
  "lunarios",
  "saliandros",
  "vitrinos",
  "carminos",
  "braseiros",
  "orvalhados",
  "pedralvos",
  "aureos",
  "nocefilos",
  "salmouros"
];

const bestiary = [
  "rato-sino",
  "aranha-de-selo",
  "cao-de-cinza",
  "cavaleiro-oco",
  "espectro-de-ruina"
];

async function seedWiki() {
  const wikiPages = [
    ...races.map((slug) => ({
      title: slug.replace(/-/g, " "),
      slug,
      category: "races",
      tags: ["raça"],
      contentMdx: `# ${slug}\n\nConteúdo gerado do Livro Básico.`,
      imageUrl: `/media/races/${slug}.webp`,
      published: true
    })),
    ...bestiary.map((slug) => ({
      title: slug.replace(/-/g, " "),
      slug,
      category: "bestiary",
      tags: ["criatura"],
      contentMdx: `# ${slug}\n\nConteúdo gerado do Livro Básico.`,
      imageUrl: `/media/bestiary/${slug}.webp`,
      published: true
    }))
  ];

  for (const page of wikiPages) {
    await prisma.wikiPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: page
    });
  }

  console.log("Wiki seedada com raças e bestiário.");
}

seedWiki()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
