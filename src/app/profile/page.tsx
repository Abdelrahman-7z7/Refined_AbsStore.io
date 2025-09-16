'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
  };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    preferences: {
      newsletter: false,
      smsNotifications: false,
      emailNotifications: true,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load user profile data
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        preferences: user.preferences || {
          newsletter: false,
          smsNotifications: false,
          emailNotifications: true,
        },
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserProfile] as Record<string, unknown>),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profile.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!profile.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (profile.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(profile.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in localStorage (mock)
      const updatedUser = { ...user, ...profile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h1>
          <Link
            href="/login"
            className="inline-block bg-[#369e62] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008000] transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#111] mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              {/* Profile Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#369e62] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-[#111]">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-[#369e62] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#008000] transition-colors duration-200"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
                
                <Link
                  href="/cart"
                  className="block w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  View Cart
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-100 text-red-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#111] mb-6">
                {isEditing ? 'Edit Profile Information' : 'Profile Information'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Address Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address.street"
                        name="address.street"
                        value={profile.address?.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors['address.street'] ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Enter your street address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="address.city"
                          name="address.city"
                          value={profile.address?.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                            errors['address.city'] ? 'border-red-500' : 'border-gray-300'
                          } ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="City"
                        />
                      </div>

                      <div>
                        <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          id="address.state"
                          name="address.state"
                          value={profile.address?.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                            errors['address.state'] ? 'border-red-500' : 'border-gray-300'
                          } ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="address.zipCode"
                          name="address.zipCode"
                          value={profile.address?.zipCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                            errors['address.zipCode'] ? 'border-red-500' : 'border-gray-300'
                          } ${!isEditing ? 'bg-gray-50' : ''}`}
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        id="address.country"
                        name="address.country"
                        value={profile.address?.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#369e62] focus:border-[#369e62] transition-colors duration-200 ${
                          errors['address.country'] ? 'border-red-500' : 'border-gray-300'
                        } ${!isEditing ? 'bg-gray-50' : ''}`}
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preferences.newsletter"
                        name="preferences.newsletter"
                        checked={profile.preferences?.newsletter}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-[#369e62] focus:ring-[#369e62] border-gray-300 rounded"
                      />
                      <label htmlFor="preferences.newsletter" className="ml-2 block text-sm text-gray-700">
                        Subscribe to newsletter
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preferences.emailNotifications"
                        name="preferences.emailNotifications"
                        checked={profile.preferences?.emailNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-[#369e62] focus:ring-[#369e62] border-gray-300 rounded"
                      />
                      <label htmlFor="preferences.emailNotifications" className="ml-2 block text-sm text-gray-700">
                        Email notifications
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="preferences.smsNotifications"
                        name="preferences.smsNotifications"
                        checked={profile.preferences?.smsNotifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-[#369e62] focus:ring-[#369e62] border-gray-300 rounded"
                      />
                      <label htmlFor="preferences.smsNotifications" className="ml-2 block text-sm text-gray-700">
                        SMS notifications
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2.5 bg-[#369e62] text-white rounded-lg font-semibold hover:bg-[#008000] focus:ring-2 focus:ring-[#369e62] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </motion.button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
