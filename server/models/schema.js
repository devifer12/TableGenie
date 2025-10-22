import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// Restaurant Model
export class Restaurant {
  static collection() {
    return getDB().collection('restaurants');
  }

  static async create(data) {
    const restaurant = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: 'pending', // pending, active, inactive
      beaconId: null,
      beaconConfig: null,
      settings: {
        currency: 'USD',
        timezone: 'UTC',
        taxRate: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection().insertOne(restaurant);
    return { ...restaurant, _id: result.insertedId };
  }

  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async update(id, data) {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    return await this.findById(id);
  }
}

// User Model
export class User {
  static collection() {
    return getDB().collection('users');
  }

  static async create(data) {
    const user = {
      name: data.name,
      designation: data.designation,
      restaurantId: data.restaurantId,
      email: data.email, // From restaurant
      role: 'admin', // admin, manager, staff
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection().insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async findByRestaurantId(restaurantId) {
    return await this.collection().findOne({ restaurantId });
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
}

// Temporary Registration Token Model (for multi-step registration)
export class TempRegistration {
  static collection() {
    return getDB().collection('temp_registrations');
  }

  static async create(data) {
    const tempReg = {
      restaurantId: data.restaurantId,
      email: data.email,
      token: data.token,
      verified: false,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      createdAt: new Date()
    };

    const result = await this.collection().insertOne(tempReg);
    return { ...tempReg, _id: result.insertedId };
  }

  static async findByToken(token) {
    return await this.collection().findOne({ 
      token,
      expiresAt: { $gt: new Date() }
    });
  }

  static async markVerified(token) {
    await this.collection().updateOne(
      { token },
      { $set: { verified: true } }
    );
  }

  static async deleteByToken(token) {
    await this.collection().deleteOne({ token });
  }

  // Clean up expired tokens
  static async cleanupExpired() {
    await this.collection().deleteMany({
      expiresAt: { $lt: new Date() }
    });
  }
}

// Menu Item Model
export class MenuItem {
  static collection() {
    return getDB().collection('menuItems');
  }

  static async create(data) {
    const menuItem = {
      restaurantId: data.restaurantId,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl || null,
      isAvailable: true,
      preparationTime: data.preparationTime || 15,
      allergens: data.allergens || [],
      dietary: data.dietary || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection().insertOne(menuItem);
    return { ...menuItem, _id: result.insertedId };
  }

  static async findByRestaurantId(restaurantId) {
    return await this.collection().find({ restaurantId }).toArray();
  }
}

// Table Model
export class Table {
  static collection() {
    return getDB().collection('tables');
  }

  static async create(data) {
    const table = {
      restaurantId: data.restaurantId,
      tableNumber: data.tableNumber,
      qrCode: data.qrCode,
      capacity: data.capacity || 4,
      status: 'available', // available, occupied, reserved
      currentOrderId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection().insertOne(table);
    return { ...table, _id: result.insertedId };
  }

  static async findByRestaurantId(restaurantId) {
    return await this.collection().find({ restaurantId }).toArray();
  }
}

// Order Model
export class Order {
  static collection() {
    return getDB().collection('orders');
  }

  static async create(data) {
    const order = {
      restaurantId: data.restaurantId,
      tableId: data.tableId,
      tableNumber: data.tableNumber,
      items: data.items,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      status: 'pending', // pending, confirmed, preparing, ready, delivered, completed, cancelled
      paymentStatus: 'unpaid', // unpaid, paid, refunded
      paymentMethod: data.paymentMethod || null,
      beaconVerified: data.beaconVerified || false,
      customerPhone: data.customerPhone || null,
      notes: data.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await this.collection().insertOne(order);
    return { ...order, _id: result.insertedId };
  }

  static async findByRestaurantId(restaurantId, limit = 50) {
    return await this.collection()
      .find({ restaurantId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }
}