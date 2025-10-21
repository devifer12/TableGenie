import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantEmail: "",
    restaurantPhone: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required";
    }

    if (!formData.restaurantEmail.trim()) {
      newErrors.restaurantEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.restaurantEmail)) {
      newErrors.restaurantEmail = "Please enter a valid email address";
    }

    if (!formData.restaurantPhone.trim()) {
      newErrors.restaurantPhone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.restaurantPhone)) {
      newErrors.restaurantPhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("restaurantDetails", JSON.stringify(formData));
      navigate("/signup/verify-email");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧞</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TableGenie
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            List Your Restaurant
          </h1>
          <p className="text-slate-600">
            Start your journey to seamless dining experiences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">Step 1 of 3</span>
              <span className="text-sm text-slate-500">Restaurant Details</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full w-1/3 transition-all duration-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-slate-700 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.restaurantName ? "border-red-500" : "border-slate-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="The Gourmet Bistro"
              />
              {errors.restaurantName && (
                <p className="mt-1 text-sm text-red-600">{errors.restaurantName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="restaurantEmail"
                className="block text-sm font-medium text-slate-700 mb-2">
                Restaurant Email
              </label>
              <input
                type="email"
                id="restaurantEmail"
                name="restaurantEmail"
                value={formData.restaurantEmail}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.restaurantEmail ? "border-red-500" : "border-slate-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="contact@restaurant.com"
              />
              {errors.restaurantEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.restaurantEmail}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="restaurantPhone"
                className="block text-sm font-medium text-slate-700 mb-2">
                Restaurant Phone Number
              </label>
              <input
                type="tel"
                id="restaurantPhone"
                name="restaurantPhone"
                value={formData.restaurantPhone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.restaurantPhone ? "border-red-500" : "border-slate-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.restaurantPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.restaurantPhone}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 mt-6">
              Continue to Verification
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantDetails;
