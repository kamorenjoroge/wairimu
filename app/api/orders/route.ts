import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import { Order } from '../../../models/Orders';

// GET all orders
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST (Create) a new order
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const order = await Order.create(body);
    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
