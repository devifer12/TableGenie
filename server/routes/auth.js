import express from 'express';
import crypto from 'crypto';
import { Restaurant, User, TempRegistration } from '../models/schema.js';

const router = express.Router();

// Step 1: Register Restaurant
router.post('/register/restaurant', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findByEmail(email);
    if (existingRestaurant) {
      return res.status(400).json({ 
        message: 'Restaurant with this email already exists' 
      });
    }

    // Create restaurant
    const restaurant = await Restaurant.create({ name, email, phone });

    // Generate temporary token for multi-step registration
    const tempToken = crypto.randomBytes(32).toString('hex');
    
    await TempRegistration.create({
      restaurantId: restaurant._id.toString(),
      email,
      token: tempToken
    });

    // TODO: Send OTP to email
    // await sendOTPEmail(email, otp);
    console.log('📧 OTP Email would be sent to:', email);
    console.log('⚠️  Demo Mode: OTP verification is currently bypassed');

    res.status(201).json({
      message: 'Restaurant registered successfully. Please verify your email.',
      tempToken,
      restaurantId: restaurant._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Failed to register restaurant',
      error: error.message 
    });
  }
});

// Step 2: Verify OTP (Currently Dummy Implementation)
router.post('/verify-otp', async (req, res) => {
  try {
    const { tempToken, otp } = req.body;

    if (!tempToken || !otp) {
      return res.status(400).json({ 
        message: 'Token and OTP are required' 
      });
    }

    // Find temp registration
    const tempReg = await TempRegistration.findByToken(tempToken);
    if (!tempReg) {
      return res.status(400).json({ 
        message: 'Invalid or expired token' 
      });
    }

    // TODO: Implement actual OTP verification
    // For now, accept any 6-digit OTP
    /*
    // ACTUAL OTP VERIFICATION LOGIC:
    const storedOTP = await getStoredOTP(tempReg.email);
    if (otp !== storedOTP) {
      return res.status(400).json({ 
        message: 'Invalid OTP' 
      });
    }
    */

    // Mark as verified
    await TempRegistration.markVerified(tempToken);

    // Generate new verified token
    const verifiedToken = crypto.randomBytes(32).toString('hex');
    await TempRegistration.create({
      restaurantId: tempReg.restaurantId,
      email: tempReg.email,
      token: verifiedToken,
      verified: true
    });

    res.json({
      message: 'Email verified successfully',
      verifiedToken
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ 
      message: 'Failed to verify OTP',
      error: error.message 
    });
  }
});

// Step 3: Complete Registration with User Details
router.post('/register/user', async (req, res) => {
  try {
    const { name, designation, tempToken } = req.body;

    if (!name || !designation || !tempToken) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Verify temp token
    const tempReg = await TempRegistration.findByToken(tempToken);
    if (!tempReg) {
      return res.status(400).json({ 
        message: 'Invalid or expired token' 
      });
    }

    // Get restaurant
    const restaurant = await Restaurant.findById(tempReg.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ 
        message: 'Restaurant not found' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      designation,
      restaurantId: restaurant._id.toString(),
      email: restaurant.email
    });

    // Update restaurant status to active
    await Restaurant.update(restaurant._id, { status: 'active' });

    // Clean up temp registration
    await TempRegistration.deleteByToken(tempToken);

    // Generate auth token (simple implementation)
    const authToken = crypto.randomBytes(32).toString('hex');
    
    // TODO: Implement proper JWT token generation
    // const authToken = jwt.sign(
    //   { userId: user._id, restaurantId: restaurant._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '7d' }
    // );

    res.status(201).json({
      message: 'Registration completed successfully',
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        designation: user.designation,
        email: user.email
      },
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone
      }
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ 
      message: 'Failed to complete registration',
      error: error.message 
    });
  }
});

// Cleanup expired temp registrations (run periodically)
setInterval(async () => {
  try {
    await TempRegistration.cleanupExpired();
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}, 60 * 60 * 1000); // Every hour

export default router;