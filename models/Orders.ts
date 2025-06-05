import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
}, { _id: false });

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  date: { type: Date, default: Date.now },
  phone: { type: String, required: true },
  status: {
    type: String,
     enum: ['pending', 'confirmed',  'cancelled', 'shipped'], // These are your allowed values
    default: 'pending'
  },
  shippingAddress: { type: String, required: true },
  Mpesatransactioncode: { type: String, required: true },
  items: { type: [ItemSchema], default: [] },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Order = models.Order || model('Order', OrderSchema);
