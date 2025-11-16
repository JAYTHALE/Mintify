import React from 'react';
import { UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const adminData = {
    name: 'Jay Sharma',
    mobile: '+91 98765 43210',
    email: 'jay.sharma@example.com',
    role: 'Administrator'
};

const AdminProfile = () => {
    return (
        <div className="w-full flex items-center justify-center mt-20 ">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
                <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <UserIcon className="w-16 h-16 text-[#63C070] mb-4" />

                    {/* Admin Name */}
                    <h2 className="text-2xl font-bold text-gray-800">{adminData.name}</h2>
                    <p className="text-gray-500 mb-6">{adminData.role}</p>
                </div>

                {/* Admin Details with Icons */}
                <div className="space-y-4">
                    <div className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm">
                        <UserIcon className="w-6 h-6 text-[#63C070] mr-3" />
                        <span className="text-gray-700">{adminData.name}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm">
                        <PhoneIcon className="w-6 h-6 text-green-500 mr-3" />
                        <span className="text-gray-700">{adminData.mobile}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-xl shadow-sm">
                        <EnvelopeIcon className="w-6 h-6 text-red-500 mr-3" />
                        <span className="text-gray-700">{adminData.email}</span>
                    </div>
                </div>

                {/* Edit Button */}
                {/* <div className="mt-6 flex justify-center">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
                        Edit Profile
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default AdminProfile;
