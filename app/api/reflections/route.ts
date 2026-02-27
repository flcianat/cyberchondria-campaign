import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("reflection-wall");

    const reflections = await db
      .collection("reflections")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(reflections);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reflections" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.message || !body.color || !body.sticker) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("reflection-wall");

    const newReflection = {
      message: body.message,
      color: body.color,
      sticker: body.sticker,
      createdAt: new Date(),
    };

    const result = await db.collection("reflections").insertOne(newReflection);

    return NextResponse.json({
      id: result.insertedId,
      ...newReflection,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save reflection" },
      { status: 500 },
    );
  }
}
