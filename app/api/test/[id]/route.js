import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Test from '../../../../models/Test';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    // Properly await the params object
    const awaitedParams = await params;
    const test = await Test.findById(awaitedParams.id);
    
    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(test);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch test' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    // Properly await the params object
    const awaitedParams = await params;
    const body = await request.json();
    
    const test = await Test.findByIdAndUpdate(awaitedParams.id, body, {
      new: true,
      runValidators: true
    });
    
    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(test);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update test' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    // Properly await the params object
    const awaitedParams = await params;
    const test = await Test.findByIdAndDelete(awaitedParams.id);
    
    if (!test) {
      return NextResponse.json(
        { error: 'Test not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Test deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete test' },
      { status: 500 }
    );
  }
}