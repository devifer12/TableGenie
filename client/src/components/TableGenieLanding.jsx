import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const TableGenieLanding = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      title: "Scan & Order",
      description:
        "Simply scan the QR code at your table and browse the menu instantly",
      icon: "📱",
    },
    {
      title: "BLE Security",
      description:
        "Bluetooth beacon technology ensures orders only work inside the restaurant",
      icon: "🔒",
    },
    {
      title: "No Sign-ups",
      description:
        "No apps to download, no accounts to create, no personal data required",
      icon: "✨",
    },
    {
      title: "Instant Payment",
      description: "Pay seamlessly through your phone and get your food faster",
      icon: "💳",
    },
  ];

  const benefits = [
    { text: "No fake orders", icon: "✅" },
    { text: "No stolen customer data", icon: "✅" },
    { text: "No unnecessary logins", icon: "✅" },
    { text: "Just pure, seamless dining", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧞</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TableGenie
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-600 hover:text-slate-900 transition-colors">
                How It Works
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </a>
              <button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                List Your Restaurant
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Your Restaurant's New{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Best Friend
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The smartest way to dine. Scan, order, and pay—all from your phone.
            No apps, no sign-ups, no fake orders. Just pure, seamless dining.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300">
              Try Demo
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              List Your Restaurant
            </button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Scan QR Code
                </h3>
                <p className="text-slate-600 text-sm">
                  Table 12 • The Gourmet Bistro
                </p>
                <div className="mt-4 bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      🍕 Margherita Pizza
                    </span>
                    <span className="font-semibold">$18</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Makes TableGenie Different?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We leave other systems in the dust with security and simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <p className="text-lg text-slate-700 font-medium">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple steps to revolutionize your dining experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
                      : "bg-white text-slate-700 hover:shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02 }}>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p
                        className={
                          activeFeature === index
                            ? "text-white/90"
                            : "text-slate-600"
                        }>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="text-8xl mb-6">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-slate-600 text-lg">
                    {features[activeFeature].description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">0%</div>
              <p className="text-xl opacity-90">Fake Orders</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-xl opacity-90">Secure Transactions</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">∞</div>
              <p className="text-xl opacity-90">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Grant Your Restaurant's Biggest Wish?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join the dining revolution. Happy customers, smooth service, and
            zero fraud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300">
              List Your Restaurant
            </button>
            <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-medium hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧞</span>
              </div>
              <span className="text-2xl font-bold">TableGenie</span>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p>© 2025 TableGenie. Making dining magical.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TableGenieLanding;