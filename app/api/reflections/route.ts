import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'reflections.json');

// Helper to read data
function getReflections() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write data
function saveReflection(reflection: any) {
  const reflections = getReflections();
  const newReflection = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...reflection,
  };
  // Prepend to show newest first
  reflections.unshift(newReflection);
  
  // Limit to last 100 to prevent file from growing too large in this demo
  if (reflections.length > 100) {
    reflections.length = 100;
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(reflections, null, 2));
  return newReflection;
}

export async function GET() {
  const reflections = getReflections();
  return NextResponse.json(reflections);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.message || !body.color || !body.sticker) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newReflection = saveReflection(body);
    return NextResponse.json(newReflection);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 });
  }
}
