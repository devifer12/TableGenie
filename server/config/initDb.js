import { getDB } from './db.js';

export async function initializeDatabase() {
  try {
    const db = getDB();
    
    // Drop the beaconId unique index if it exists
    try {
      await db.collection('restaurants').dropIndex('beaconId_1');
      console.log('✅ Dropped beaconId unique index');
    } catch (error) {
      // Index might not exist, which is fine
      if (error.code !== 27) { // 27 = IndexNotFound
        console.log('ℹ️  beaconId index does not exist or already dropped');
      }
    }

    // Create sparse unique index for beaconId (allows multiple null values)
    await db.collection('restaurants').createIndex(
      { beaconId: 1 }, 
      { unique: true, sparse: true }
    );
    console.log('✅ Created sparse unique index for beaconId');

    // Ensure email is unique
    await db.collection('restaurants').createIndex(
      { email: 1 }, 
      { unique: true }
    );
    console.log('✅ Ensured email unique index');

    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}
