import React from "react";
import {
    Users,
    ShoppingCart,
    Package
} from "lucide-react";
import { useGetproductQuery } from "../../redux/apis/adminApi";
import { useGetordersQuery } from "../../redux/apis/productApi";
import { useGetcustomerQuery } from "../../redux/apis/customer";


export default function AdminDashboard() {
    const { data: productsData } = useGetproductQuery();
    console.log(productsData);

    const { data: ordersData } = useGetordersQuery();
    const { data: customersData } = useGetcustomerQuery();

    const totalCustomers = customersData?.totalCustomers || 0;
    const totalOrders = ordersData?.totalOrders || 0;
    const totalProducts = productsData?.products?.length || 0;

    return (
        <div className="p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                {/* Customers */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-full">
                            <Users className="text-blue-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Customers</p>
                            <h2 className="text-2xl font-semibold">{totalCustomers}</h2>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <ShoppingCart className="text-green-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Orders</p>
                            <h2 className="text-2xl font-semibold">{totalOrders}</h2>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-full">
                            <Package className="text-purple-600" size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Products</p>
                            <h2 className="text-2xl font-semibold">{totalProducts}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
