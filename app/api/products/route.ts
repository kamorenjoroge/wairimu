// app/api/products/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Products';



export async function GET() {
  try {
    await dbConnect();
    
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
    
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}