import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🧞</span>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Welcome to TableGenie!
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          Your restaurant dashboard is being prepared. We'll have everything ready for you soon!
        </p>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <p className="text-slate-700 font-medium mb-2">What's Next?</p>
          <ul className="text-left text-slate-600 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Set up your menu and pricing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📱</span>
              <span>Generate QR codes for your tables</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔒</span>
              <span>Configure BLE beacon security</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💳</span>
              <span>Connect payment gateway</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;