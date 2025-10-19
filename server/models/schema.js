// Sample MongoDB Schema Structures for TableGenie

export const RestaurantSchema = {
  name: String,
  address: String,
  phone: String,
  email: String,
  beaconId: String, // Unique BLE beacon identifier
  beaconConfig: {
    uuid: String,
    major: Number,
    minor: Number,
    range: Number, // in meters
  },
  ownerId: String, // Firebase Auth UID
  settings: {
    currency: String,
    timezone: String,
    taxRate: Number,
  },
  status: String, // 'active', 'inactive', 'pending'
  createdAt: Date,
  updatedAt: Date,
};

export const TableSchema = {
  restaurantId: String, // Reference to restaurant
  tableNumber: String,
  qrCode: String, // Unique QR code identifier
  capacity: Number,
  status: String, // 'available', 'occupied', 'reserved'
  currentOrderId: String, // Reference to current order
  createdAt: Date,
  updatedAt: Date,
};

export const MenuItemSchema = {
  restaurantId: String,
  name: String,
  description: String,
  price: Number,
  category: String, // 'appetizer', 'main', 'dessert', 'beverage'
  imageUrl: String,
  isAvailable: Boolean,
  preparationTime: Number, // in minutes
  allergens: [String],
  dietary: [String], // 'vegetarian', 'vegan', 'gluten-free', etc.
  createdAt: Date,
  updatedAt: Date,
};

export const OrderSchema = {
  restaurantId: String,
  tableId: String,
  tableNumber: String,
  items: [
    {
      menuItemId: String,
      name: String,
      price: Number,
      quantity: Number,
      specialInstructions: String,
    },
  ],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String, // 'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'
  paymentStatus: String, // 'unpaid', 'paid', 'refunded'
  paymentMethod: String, // 'card', 'upi', 'cash'
  beaconVerified: Boolean, // BLE verification status
  customerPhone: String, // Optional
  notes: String,
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date,
};

export const PaymentSchema = {
  orderId: String,
  amount: Number,
  currency: String,
  method: String,
  transactionId: String,
  status: String, // 'pending', 'success', 'failed', 'refunded'
  gatewayResponse: Object,
  createdAt: Date,
  updatedAt: Date,
};