import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'tablegenie';

let client;
let db;

export const connectDB = async () => {
  try {
    if (db) {
      console.log('MongoDB already connected');
      return db;
    }

    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db(dbName);
    
    console.log(`✅ MongoDB connected successfully to database: ${dbName}`);
    
    // Create indexes for better performance
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // Create indexes for collections
    await db.collection('restaurants').createIndex({ name: 1 });
    await db.collection('restaurants').createIndex({ beaconId: 1 }, { unique: true });
    
    await db.collection('tables').createIndex({ restaurantId: 1 });
    await db.collection('tables').createIndex({ tableNumber: 1, restaurantId: 1 }, { unique: true });
    
    await db.collection('orders').createIndex({ restaurantId: 1 });
    await db.collection('orders').createIndex({ tableId: 1 });
    await db.collection('orders').createIndex({ createdAt: -1 });
    
    await db.collection('menuItems').createIndex({ restaurantId: 1 });
    await db.collection('menuItems').createIndex({ category: 1 });
    
    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('⚠️  Error creating indexes:', error.message);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});