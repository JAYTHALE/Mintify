import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useGetordersQuery } from '../redux/apis/productApi';

const AllOrders = () => {
    const { data, isLoading } = useGetordersQuery();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <div>Loading orders...</div>;

    // API data वर filter
    const filteredOrders = data.orders.filter((order) =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">All Orders</h1>

            {/* Search Bar */}
            <div className="mb-6 relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search by user, product, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-300 pl-12 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">S.No</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">User</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Product</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">EMI</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{order.customer.name}</td>
                                    <td className="px-6 py-4">{order.product.name}</td>
                                    <td className="px-6 py-4">
                                        ₹{order.emiPlan.monthlyEMI.toFixed(2)}/month ({order.emiPlan.months} months)
                                    </td>
                                    <td className="px-6 py-4">₹{order.product.price}</td>
                                    <td className={`px-6 py-4 font-semibold ${order.status === 'Completed' ? 'text-green-600' :
                                        order.status === 'Pending' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
