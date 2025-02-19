import { prisma } from "./db"

async function main() {
  const translations = [
    {
      english: "hello",
      balti: "ju-le",
      pronunciation: "dʒuːleɪ",
      category: "greetings",
    },
    {
      english: "thank you",
      balti: "thujeche",
      pronunciation: "θuːdʒetʃe",
      category: "greetings",
    },
    {
      english: "water",
      balti: "chhu",
      pronunciation: "tʃuː",
      category: "nature",
    },
    // Add more translations here
  ]

  for (const translation of translations) {
    await prisma.translation.upsert({
      where: { english: translation.english },
      update: translation,
      create: translation,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

