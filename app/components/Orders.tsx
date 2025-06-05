"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "shipped";
  shippingAddress: string;
  items: OrderItem[];
  total: number;
}

const Order = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const userOrders = data.filter(
          (order: Order) =>
            order.customerEmail === user?.primaryEmailAddress?.emailAddress
        );

        setOrders(userOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user, isLoaded]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="p-4 mt-40 max-w-7xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mt-40 max-w-7xl mx-auto text-center">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Error loading orders</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-4 mt-40 max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
        <p className="mb-6">You have not placed any orders yet.</p>
        <Link
          href="/shop"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  if (selectedOrder) {
    const order = orders.find((o) => o._id === selectedOrder);
    if (!order)
      return (
        <div className="p-4 mt-40 max-w-7xl mx-auto text-center">
          <p>Order not found</p>
          <button
            onClick={() => setSelectedOrder(null)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
          >
            Back to Orders
          </button>
        </div>
      );

    const calculatedTotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div className="p-4 mt-20 mb-20 max-w-7xl mx-auto">
        <button
          onClick={() => setSelectedOrder(null)}
          className="mb-6 flex items-center text-primary hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to all orders
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold mb-2">
              Order # {order._id.slice(-8).toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <span>
                Placed on{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block
      ${
        {
          pending: "bg-yellow-100 text-yellow-800",
          confirmed: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
          shipped: "bg-blue-100 text-blue-800",
        }[order.status] || "bg-gray-100 text-gray-800"
      }
    `}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Shipping Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {order.customerName}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.customerEmail}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.shippingAddress}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.phone}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Kes {calculatedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2 font-bold">
                  <span>Total:</span>
                  <span>Kes {order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-lg font-semibold p-6 border-b">Order Items</h2>
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={`${order._id}-${item._id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Kes {item.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        Kes {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile List */}
            <div className="md:hidden">
              {order.items.map((item) => (
                <div
                  key={`${order._id}-${item._id}-mobile`}
                  className="p-4 border-b"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        Kes {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    Kes {order.total}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block
      ${
        {
          pending: "bg-yellow-100 text-yellow-800",
          confirmed: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
          shipped: "bg-blue-100 text-blue-800",
        }[order.status] || "bg-gray-100 text-gray-800"
      }
    `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => setSelectedOrder(order._id)}
                    className="text-primary hover:text-primary-dark font-medium text-sm px-3 py-1 rounded hover:bg-gray-100"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={`${order._id}-mobile`}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block
      ${
        {
          pending: "bg-yellow-100 text-yellow-800",
          confirmed: "bg-green-100 text-green-800",
          cancelled: "bg-red-100 text-red-800",
          shipped: "bg-blue-100 text-blue-800",
        }[order.status] || "bg-gray-100 text-gray-800"
      }
    `}
              >
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center border-t pt-3 mt-3">
              <div>
                <p className="text-sm font-semibold">Kes {order.total}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(order._id)}
                className="text-primary hover:text-primary-dark font-medium text-sm px-3 py-1 rounded hover:bg-gray-100"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
