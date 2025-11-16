import React from "react";
import { useGetcustomerorderQuery } from "../redux/apis/productApi";
import { Truck, ShieldCheck } from "lucide-react";

const MyOrders = () => {
    const { data, isLoading, error } = useGetcustomerorderQuery();

    if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error fetching orders</p>;
    if (!data?.orders?.length) return <p className="text-center mt-10">No orders yet.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 mt-6">
            <h1 className="text-2xl font-semibold mb-6 text-gray-900">My Orders</h1>
            <div className="space-y-6">
                {data.orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Header: Order Status */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{order.product.name}</h2>
                                <p className="text-sm text-gray-500">{order.product.brand} | {order.product.category}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                        order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                            "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 border flex-shrink-0">
                                <img src={order.product.mainImage} alt={order.product.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <p><span className="font-medium">Variant:</span> {order.product.selectedVariant.color}, {order.product.selectedVariant.storage}</p>
                                <p><span className="font-medium">Price:</span> ₹{order.product.price.toLocaleString()}</p>
                                <p><span className="font-medium">EMI:</span> {order.emiPlan.months} months | ₹{order.emiPlan.monthlyEMI.toLocaleString()}/month</p>
                                <p><span className="font-medium">Total Payable:</span> ₹{order.emiPlan.totalPayable.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Customer & Shipping Info */}
                        <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-700">
                            <div>
                                <p><span className="font-medium">Customer:</span> {order.customer.name}</p>
                                <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                                <p><span className="font-medium">Mobile:</span> {order.customer.mobile}</p>
                                {order.customer.address?.city && (
                                    <p><span className="font-medium">Address:</span> {order.customer.address.house}, {order.customer.address.area}, {order.customer.address.city}, {order.customer.address.state} - {order.customer.address.pincode}</p>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <Truck className="w-4 h-4 text-gray-800" /> Free Shipping
                                </div>
                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                                    <ShieldCheck className="w-4 h-4 text-gray-800" /> Secure Checkout
                                </div>
                            </div>
                        </div>

                        {/* Order Date */}
                        <p className="mt-4 text-right text-gray-400 text-xs">
                            Ordered on: {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
