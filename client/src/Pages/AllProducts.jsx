import React, { useState } from "react";
import { Search } from "lucide-react";
import { useGetproductQuery } from "../redux/apis/adminApi";

const AllProducts = () => {
    const { data, isLoading } = useGetproductQuery();
    const [search, setSearch] = useState("");

    // Loading state
    if (isLoading) return <div>Loading products...</div>;

    // Filter products based on search
    const filtered = data.products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>

            {/* Search Bar */}
            <div className="mb-6 relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 pl-12 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 text-xs">
                        <tr>
                            <th className="p-4 text-left w-[8%]">#</th>
                            <th className="p-4 text-left w-[35%]">Product</th>
                            <th className="p-4 text-left w-[20%]">Category</th>
                            <th className="p-4 text-left w-[15%]">Price</th>
                            <th className="p-4 text-left w-[15%]">Stock</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 divide-y">
                        {filtered.map((p, index) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{index + 1}</td>

                                {/* IMAGE + TEXT */}
                                <td className="p-4 flex items-center gap-3">
                                    <img
                                        src={p.mainImage}
                                        alt={p.name}
                                        className="w-12 h-12 object-cover rounded-lg border"
                                    />
                                    <span className="font-semibold">{p.name}</span>
                                </td>

                                <td className="p-4">{p.category}</td>
                                <td className="p-4 font-semibold">₹{p.price}</td>

                                {/* Stock Status */}
                                <td className="p-4">
                                    {p.stock > 0 ? (
                                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                                            In Stock ({p.stock})
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                                            Out of Stock
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-5 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
