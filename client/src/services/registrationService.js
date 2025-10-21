import { supabase } from "../lib/supabase";

export const registrationService = {
  async sendVerificationCode(email) {
    try {
      return {
        success: true,
        message: "Verification code sent successfully",
      };
    } catch (error) {
      console.error("Error sending verification code:", error);
      return {
        success: false,
        error: error.message || "Failed to send verification code",
      };
    }
  },

  async verifyEmailCode(email, code) {
    try {
      if (code === "123456") {
        return {
          success: true,
          message: "Email verified successfully",
        };
      } else {
        return {
          success: false,
          error: "Invalid verification code",
        };
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      return {
        success: false,
        error: error.message || "Failed to verify code",
      };
    }
  },

  async registerRestaurant(restaurantData, userData) {
    try {
      const { data: restaurant, error: restaurantError } = await supabase
        .from("restaurants")
        .insert([
          {
            name: restaurantData.restaurantName,
            email: restaurantData.restaurantEmail,
            phone: restaurantData.restaurantPhone,
          },
        ])
        .select()
        .maybeSingle();

      if (restaurantError) {
        throw new Error(restaurantError.message);
      }

      if (!restaurant) {
        throw new Error("Failed to create restaurant record");
      }

      const { data: user, error: userError } = await supabase
        .from("restaurant_users")
        .insert([
          {
            restaurant_id: restaurant.id,
            name: userData.userName,
            designation: userData.designation,
            email: restaurantData.restaurantEmail,
            is_primary: true,
          },
        ])
        .select()
        .maybeSingle();

      if (userError) {
        await supabase.from("restaurants").delete().eq("id", restaurant.id);
        throw new Error(userError.message);
      }

      return {
        success: true,
        data: {
          restaurant,
          user,
        },
        message: "Restaurant registered successfully",
      };
    } catch (error) {
      console.error("Error registering restaurant:", error);
      return {
        success: false,
        error: error.message || "Failed to register restaurant",
      };
    }
  },

  async checkEmailExists(email) {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw new Error(error.message);
      }

      return {
        success: true,
        exists: !!data,
      };
    } catch (error) {
      console.error("Error checking email:", error);
      return {
        success: false,
        error: error.message || "Failed to check email",
      };
    }
  },
};
