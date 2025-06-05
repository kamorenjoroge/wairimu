// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Product from '../../../../models/Products';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const awaitedParams = await params;
    const product = await Product.findById(awaitedParams.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

