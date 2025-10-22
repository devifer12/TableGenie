import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, LogOut } from 'lucide-react';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Load user and restaurant data from localStorage
    const user = localStorage.getItem('userData');
    const restaurant = localStorage.getItem('restaurantData');
    
    if (user) setUserData(JSON.parse(user));
    if (restaurant) setRestaurantData(JSON.parse(restaurant));

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('restaurantData');
    navigate('/login');
  };

  const handlePersonalDetails = () => {
    // TODO: Navigate to personal details page
    console.log('Navigate to personal details');
    setIsOpen(false);
  };

  const handleRestaurantDetails = () => {
    // TODO: Navigate to restaurant details page
    console.log('Navigate to restaurant details');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
      >
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">
            {restaurantData?.name || 'Restaurant Name'}
          </p>
          <p className="text-xs text-slate-500">
            {userData?.name || 'User Name'}
          </p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {restaurantData?.name?.charAt(0) || 'R'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
          <button
            onClick={handlePersonalDetails}
            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
          >
            <User className="w-5 h-5 text-slate-600" />
            <span className="text-slate-700">Personal Details</span>
          </button>
          
          <button
            onClick={handleRestaurantDetails}
            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
          >
            <Building2 className="w-5 h-5 text-slate-600" />
            <span className="text-slate-700">Restaurant Details</span>
          </button>
          
          <div className="border-t border-slate-200 my-2"></div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="text-red-600">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;