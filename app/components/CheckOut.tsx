"use client";
import { useCartStore } from "@/lib/store/cartStore";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const CheckOut = () => {
  const { isSignedIn, user } = useUser();
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    county: "",
    town: "",
    mpesaCode: "",
  });

  // Autofill user data when signed in
  useEffect(() => {
    if (isSignedIn && user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [isSignedIn, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.county ||
        !formData.town ||
        !formData.mpesaCode
      ) {
        throw new Error("Please fill all required fields");
      }

      // Prepare order data
      const orderData = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        phone: formData.phone, // ✅ This was missing
        date: new Date().toISOString(),
        status: "pending",
        shippingAddress: `${formData.town}, ${formData.county}`,
        Mpesatransactioncode: formData.mpesaCode,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: getTotalPrice().toFixed(2),
      };

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      
      await response.json();
      
      toast.success(
        "Order submitted successfully! We will review your payment and contact you shortly."
      );
      clearCart();

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        secondaryPhone: "",
        county: "",
        town: "",
        mpesaCode: "",
      });

    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Order submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to checkout</h1>
        <p>Redirecting to sign in page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 overflow-hidden">
                    <Image
                      height={64}
                      width={64}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Kes {item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  Kes {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>Kes {getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery:</span>
              <span>To be determined</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>Kes {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="secondaryPhone"
                  className="block text-sm font-medium mb-1"
                >
                  Secondary Phone (Optional)
                </label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="county"
                  className="block text-sm font-medium mb-1"
                >
                  County *
                </label>
                <select
                  id="county"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select County</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="town"
                  className="block text-sm font-medium mb-1"
                >
                  Town *
                </label>
                <input
                  type="text"
                  id="town"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
              <h3 className="font-medium text-yellow-800 mb-2">
                Payment Instructions
              </h3>
              <p className="text-sm text-yellow-700 mb-2">
                1. Pay via M-Pesa Paybill: <strong>777233</strong>
              </p>
              <p className="text-sm text-yellow-700 mb-2">
                2. Use your name as account number
              </p>
              <p className="text-sm text-yellow-700">
                3. Enter the M-Pesa transaction code below
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="mpesaCode"
                className="block text-sm font-medium mb-1"
              >
                M-Pesa Transaction Code *
              </label>
              <input
                type="text"
                id="mpesaCode"
                name="mpesaCode"
                value={formData.mpesaCode}
                onChange={handleChange}
                placeholder="e.g. RF45GH78"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className={`w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors ${
                isSubmitting ? "opacity-80 cursor-not-allowed" : ""
              } ${cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">↻</span>
                  Processing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;