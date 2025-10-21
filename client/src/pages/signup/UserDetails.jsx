import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { registrationService } from "../../services/registrationService";

const UserDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    designation: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const emailVerified = localStorage.getItem("emailVerified");
    const restaurantDetails = localStorage.getItem("restaurantDetails");

    if (!emailVerified || !restaurantDetails) {
      navigate("/signup");
    }
  }, [navigate]);

  const designationOptions = [
    "Owner",
    "Manager",
    "General Manager",
    "Operations Manager",
    "Director",
    "Partner",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Your name is required";
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = "Name must be at least 2 characters";
    }

    if (!formData.designation) {
      newErrors.designation = "Please select your designation";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const restaurantData = JSON.parse(localStorage.getItem("restaurantDetails"));

      const result = await registrationService.registerRestaurant(
        restaurantData,
        formData
      );

      if (result.success) {
        localStorage.setItem("userDetails", JSON.stringify(formData));
        localStorage.setItem("registrationComplete", "true");
        navigate("/signup/success");
      } else {
        setErrors({ submit: result.error || "Failed to complete registration" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
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
            Tell Us About Yourself
          </h1>
          <p className="text-slate-600">
            Just a few more details to complete your profile
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">Step 3 of 3</span>
              <span className="text-sm text-slate-500">User Details</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full w-full transition-all duration-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.userName ? "border-red-500" : "border-slate-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="John Doe"
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-slate-700 mb-2">
                Your Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.designation ? "border-red-500" : "border-slate-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white`}>
                <option value="">Select your designation</option>
                {designationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.designation && (
                <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {isSubmitting ? "Creating Your Account..." : "Complete Setup"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/signup/verify-email")}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Back to Verification
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;
