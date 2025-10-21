import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("restaurantDetails");
    if (!savedData) {
      navigate("/signup");
      return;
    }
    const data = JSON.parse(savedData);
    setRestaurantEmail(data.restaurantEmail);
  }, [navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    if (otpValue === "123456") {
      localStorage.setItem("emailVerified", "true");
      navigate("/signup/user-details");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    alert("Verification code resent successfully!");
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
            Verify Your Email
          </h1>
          <p className="text-slate-600">
            We've sent a 6-digit code to{" "}
            <span className="font-medium text-slate-900">{restaurantEmail}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">Step 2 of 3</span>
              <span className="text-sm text-slate-500">Email Verification</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full w-2/3 transition-all duration-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-semibold border ${
                      error ? "border-red-500" : "border-slate-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                ))}
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              Verify Email
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-slate-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Resend Code
              </button>
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Back to Restaurant Details
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-semibold">For testing:</span> Use code{" "}
            <span className="font-mono font-bold">123456</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
