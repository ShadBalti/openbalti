import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get("word")

  if (!word) {
    return NextResponse.json({ error: "Word parameter is required" }, { status: 400 })
  }

  try {
    const translation = await prisma.translation.findFirst({
      where: {
        english: {
          equals: word.toLowerCase(),
          mode: "insensitive",
        },
      },
    })

    if (!translation) {
      return NextResponse.json({ error: "Translation not found" }, { status: 404 })
    }

    return NextResponse.json(translation)
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Failed to fetch translation" }, { status: 500 })
  }
}

