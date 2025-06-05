//api/test/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Test from '../../../models/Test';


// GET all 
export async function GET() {
  try {
    await dbConnect();
    const tests = await Test.find({});
    return NextResponse.json(tests);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST (Create) 
export async function POST(request: Request) {  
  try {
    await dbConnect();
    const body = await request.json();
    const test = await Test.create(body);
    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}