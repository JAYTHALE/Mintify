import React, { useState } from "react";
import { User, Search } from "lucide-react";
import { useGetcustomerQuery } from "../redux/apis/customer";

const AllCustomers = () => {
    const { data, isLoading } = useGetcustomerQuery();
    const [search, setSearch] = useState("");

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const customers = data?.customers || [];

    const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.mobile.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">All Customers</h1>

            {/* Search Bar */}
            <div className="mb-6 relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 pl-12 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 text-xs">
                        <tr>
                            <th className="p-4 text-left w-[8%]">#</th>
                            <th className="p-4 text-left w-[25%]">Customer</th>
                            <th className="p-4 text-left w-[18%]">Mobile</th>
                            <th className="p-4 text-left w-[25%]">Email</th>
                            <th className="p-4 text-left w-[24%]">Address</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700 divide-y">
                        {filtered.map((c, index) => (
                            <tr key={c._id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{index + 1}</td>

                                {/* USER ICON + NAME */}
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow">
                                        <User size={16} />
                                    </div>
                                    <span className="font-semibold">{c.name}</span>
                                </td>

                                <td className="p-4">{c.mobile}</td>
                                <td className="p-4">{c.email}</td>
                                <td className="p-4">
                                    {c.address
                                        ? `${c.address.house}, ${c.address.area}, ${c.address.city}`
                                        : "N/A"}
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td className="p-5 text-center text-gray-500" colSpan="5">
                                    No customers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCustomers;
