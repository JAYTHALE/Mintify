import React from "react";

export default function ProductCard({ product }) {
    if (!product) return null; // safety check

    const {
        slug = "#",
        name = "Unknown Product",
        image = "https://via.placeholder.com/150?text=No+Image",
        mrp = 0,
        price = 0,
        badges = [],
        variant = "",
    } = product;

    return (
        <div className="bg-white rounded-xl border border-[#E6ECE6] shadow-sm overflow-hidden hover:shadow-lg transition">
            <a href={`/products/${slug}`} className="block">
                <div className="w-full h-44 bg-[#FAFAFA] flex items-center justify-center">
                    <img
                        src={image}
                        alt={name}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                        className="max-h-40 object-contain"
                    />
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[#2E3A45] truncate">
                            {name}
                        </h3>
                        <div className="text-xs text-[#2E3A45]/60">{variant}</div>
                    </div>

                    <div className="mt-2 flex items-baseline gap-3">
                        <div className="text-lg font-bold text-[#2E3A45]">
                            ₹{price.toLocaleString()}
                        </div>
                        <div className="text-xs text-[#2E3A45]/50 line-through">
                            ₹{mrp.toLocaleString()}
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {badges.map((b, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs bg-[#F7FBF8] text-[#3AA76D] rounded-md border border-[#E6F4EA]"
                            >
                                {b}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4">
                        <button className="w-full bg-gradient-to-r from-[#63C070] to-[#559E5F] text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition">
                            View & EMI options
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
}
