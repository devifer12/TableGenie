/*
  # Create Restaurant Management Schema

  ## Overview
  This migration creates the core tables for managing restaurant registrations and user accounts.

  ## New Tables

  ### `restaurants`
  - `id` (uuid, primary key) - Unique restaurant identifier
  - `name` (text, not null) - Restaurant name
  - `email` (text, unique, not null) - Restaurant contact email
  - `phone` (text, not null) - Restaurant contact phone number
  - `is_active` (boolean, default true) - Whether the restaurant is active
  - `created_at` (timestamptz, default now()) - Registration timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### `restaurant_users`
  - `id` (uuid, primary key) - Unique user identifier
  - `restaurant_id` (uuid, foreign key) - Reference to restaurants table
  - `name` (text, not null) - User's full name
  - `designation` (text, not null) - User's role (Owner, Manager, etc.)
  - `email` (text, unique, not null) - User's email (copied from restaurant during signup)
  - `is_primary` (boolean, default false) - Whether this is the primary account holder
  - `created_at` (timestamptz, default now()) - Account creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on both tables
  - Add policies for authenticated users to manage their own restaurant data
  - Restrict access to only authenticated users who own the restaurant

  ## Important Notes
  1. Email verification status is tracked separately and will be added later
  2. The primary user (first registrant) is marked with `is_primary = true`
  3. All timestamps use timezone-aware timestamps for consistency
*/

-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create restaurant_users table
CREATE TABLE IF NOT EXISTS restaurant_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  designation text NOT NULL,
  email text UNIQUE NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_restaurants_email ON restaurants(email);
CREATE INDEX IF NOT EXISTS idx_restaurant_users_restaurant_id ON restaurant_users(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_users_email ON restaurant_users(email);

-- Enable Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for restaurants table

-- Users can view restaurants they are associated with
CREATE POLICY "Users can view their own restaurant"
  ON restaurants
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT restaurant_id FROM restaurant_users
      WHERE restaurant_users.email = auth.jwt()->>'email'
    )
  );

-- Users can insert restaurants (during signup)
CREATE POLICY "Users can create restaurants"
  ON restaurants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update their own restaurant details
CREATE POLICY "Users can update their own restaurant"
  ON restaurants
  FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT restaurant_id FROM restaurant_users
      WHERE restaurant_users.email = auth.jwt()->>'email'
    )
  )
  WITH CHECK (
    id IN (
      SELECT restaurant_id FROM restaurant_users
      WHERE restaurant_users.email = auth.jwt()->>'email'
    )
  );

-- RLS Policies for restaurant_users table

-- Users can view other users in their restaurant
CREATE POLICY "Users can view restaurant team members"
  ON restaurant_users
  FOR SELECT
  TO authenticated
  USING (
    restaurant_id IN (
      SELECT restaurant_id FROM restaurant_users
      WHERE restaurant_users.email = auth.jwt()->>'email'
    )
  );

-- Users can create their own user account (during signup)
CREATE POLICY "Users can create their account"
  ON restaurant_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update their own details
CREATE POLICY "Users can update their own details"
  ON restaurant_users
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt()->>'email')
  WITH CHECK (email = auth.jwt()->>'email');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurant_users_updated_at
  BEFORE UPDATE ON restaurant_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
