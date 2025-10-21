import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const emailVerified = localStorage.getItem("emailVerified");
    const restaurantDetails = localStorage.getItem("restaurantDetails");
    const userDetails = localStorage.getItem("userDetails");

    if (!emailVerified || !restaurantDetails || !userDetails) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"></path>
            </svg>
          </motion.div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Registration Successful!
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Thank you for listing your restaurant with TableGenie.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              What's Next?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We're preparing your personalized restaurant dashboard. You'll be able to
              manage your menu, view orders, track analytics, and much more. We'll
              notify you once everything is ready!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              Return to Home
            </button>
            <p className="text-sm text-slate-500">
              Expect an email from us within 24 hours
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center">
          <p className="text-slate-600">
            Questions?{" "}
            <a
              href="mailto:support@tablegenie.com"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupSuccess;
