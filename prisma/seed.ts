import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Mestre Demo",
      email: "demo@demo.com",
      passwordHash: "demo1234"
    }
  });

  const campaign = await prisma.campaign.create({
    data: {
      name: "O Sino que Não Para",
      description: "Campanha demo ambientada em Várn.",
      tone: "Mistério e tensão",
      mapUrl: "https://placehold.co/1200x800/png",
      members: {
        create: {
          role: "MESTRE",
          userId: user.id
        }
      }
    }
  });

  const characters = await prisma.character.createMany({
    data: [
      {
        name: "Sola de Ferro",
        campaignId: campaign.id,
        userId: user.id,
        level: 2,
        className: "Guerreira Jurada",
        race: "Ferríneos",
        attributes: { FOR: 16, AGI: 12, VIG: 14, INT: 10, VON: 12, PRE: 8 },
        skills: { Atletismo: true, Intimidacao: true },
        feats: ["Defensor"],
        equipment: ["Espada longa", "Escudo", "Cota de malha"],
        runes: [],
        conditions: [],
        maxHp: 18,
        maxFoc: 3
      },
      {
        name: "Kesh Umbromar",
        campaignId: campaign.id,
        userId: user.id,
        level: 2,
        className: "Ladino de Guilda",
        race: "Umbromar",
        attributes: { FOR: 10, AGI: 16, VIG: 12, INT: 13, VON: 10, PRE: 12 },
        skills: { Furtividade: true, Investigacao: true },
        feats: ["Mao Leve"],
        equipment: ["Adagas", "Armadura leve"],
        runes: [],
        conditions: ["Sangrando"],
        maxHp: 14,
        maxFoc: 2
      },
      {
        name: "Rinna Braseira",
        campaignId: campaign.id,
        userId: user.id,
        level: 2,
        className: "Arauta",
        race: "Braseiros",
        attributes: { FOR: 9, AGI: 11, VIG: 12, INT: 12, VON: 14, PRE: 16 },
        skills: { Persuasao: true, Misticismo: true },
        feats: ["Conjurador Concentrado"],
        equipment: ["Rapieira", "Armadura leve"],
        runes: ["Cura Gravada", "Fagulha"],
        conditions: [],
        maxHp: 12,
        maxFoc: 4
      }
    ]
  });

  const session = await prisma.gameSession.create({
    data: {
      name: "Sessão 1 - Ruína do Sino",
      notes: "Sessão demo com combate e evento sobrenatural.",
      scheduledAt: new Date("2026-02-05T20:00:00.000Z"),
      status: "EM_ANDAMENTO",
      campaignId: campaign.id
    }
  });

  const allCharacters = await prisma.character.findMany({
    where: { campaignId: campaign.id }
  });

  await prisma.sessionParticipant.createMany({
    data: allCharacters.map((character) => ({
      sessionId: session.id,
      characterId: character.id
    }))
  });

  await prisma.combatState.create({
    data: {
      sessionId: session.id,
      initiative: [
        { characterId: allCharacters[0].id, initiative: 17 },
        { characterId: allCharacters[1].id, initiative: 15 },
        { characterId: allCharacters[2].id, initiative: 12 }
      ],
      activeTurn: 0
    }
  });

  await prisma.aiSummary.create({
    data: {
      sessionId: session.id,
      shortText:
        "O grupo investigou a torre, enfrentou um Cavaleiro Oco e selou o sino antigo.",
      longText:
        "- Sola liderou a entrada na ruína.\n- Kesh desarmou uma armadilha rúnica.\n- Rinna gastou FOC para curar o grupo.\n- O Cavaleiro Oco foi derrotado.\n- O sino foi selado com ajuda do Selo.",
      narratedText:
        "Na torre esquecida, o grupo enfrentou sombras antigas e selou o sino que ecoava pela vila."
    }
  });

  await prisma.sessionSummary.create({
    data: {
      sessionId: session.id,
      shortMd: "O grupo selou o sino antigo e encerrou a ameaça na torre.",
      longMd:
        "- Sola liderou a entrada na ruína.\n- Kesh desarmou uma armadilha rúnica.\n- Rinna gastou FOC para curar o grupo.\n- O Cavaleiro Oco foi derrotado."
    }
  });

  await prisma.roomMessage.createMany({
    data: [
      {
        sessionId: session.id,
        sender: "Mestre",
        content: "A torre tremula com o som do sino enterrado."
      },
      {
        sessionId: session.id,
        sender: "Rinna",
        content: "Eu conjuro Cura Gravada em Sola."
      }
    ]
  });

  await prisma.diceRoll.createMany({
    data: [
      {
        sessionId: session.id,
        roller: "Kesh",
        formula: "1d20+5",
        result: "17"
      }
    ]
  });

  const rulePage = await prisma.rulePage.create({
    data: {
      slug: "regras-basicas",
      title: "Regras básicas",
      content: "Resumo das regras básicas do livro Runas e Ferro."
    }
  });

  await prisma.ruleIndex.create({
    data: {
      rulePageId: rulePage.id,
      heading: "Testes e DFs",
      content: "Role 1d20 e compare com a DF para sucesso."
    }
  });

  const wikiPages = [
    {
      title: "Ferríneos",
      slug: "ferrineos",
      category: "races",
      tags: ["forja", "defesa"],
      contentMdx: "Raça marcada pelo ferro e tradição de forja.",
      imageUrl: "/media/races/ferrineos.webp",
      published: true
    },
    {
      title: "Rato-Sino",
      slug: "rato-sino",
      category: "bestiary",
      tags: ["ND 1/8"],
      contentMdx: "Criatura do bestiário associada ao sino da ruína.",
      imageUrl: "/media/bestiary/rato-sino.webp",
      published: true
    }
  ];

  await prisma.wikiPage.createMany({
    data: wikiPages
  });

  await prisma.mediaAsset.createMany({
    data: [
      {
        slug: "ferrineos",
        type: "RACE",
        url: "/media/races/ferrineos.webp",
        thumbUrl: "/media/races/ferrineos-thumb.webp",
        prompt:
          "fantasia medieval sombria, pintura digital detalhada, ferríneo, fundo simples"
      },
      {
        slug: "rato-sino",
        type: "MONSTER",
        url: "/media/bestiary/rato-sino.webp",
        thumbUrl: "/media/bestiary/rato-sino-thumb.webp",
        prompt:
          "fantasia medieval sombria, pintura digital detalhada, criatura rato-sino, fundo simples"
      }
    ]
  });

  await prisma.characterState.createMany({
    data: allCharacters.map((character) => ({
      characterId: character.id,
      currentHp: character.maxHp,
      currentFoc: character.maxFoc,
      conditions: character.conditions
    }))
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
