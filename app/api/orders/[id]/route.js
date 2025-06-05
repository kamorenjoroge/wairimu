// app/api/orders/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import { Order } from '../../../../models/Orders';

// GET single order by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const awaitedParams = await params;
    const order = await Order.findById(awaitedParams.id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const awaitedParams = await params;
    const { status } = await request.json();

    // Validate the status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'shipped'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      awaitedParams.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}