// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Checkout() {
    const [payload, setPayload] = useState(null);
    useEffect(() => {
        const p = JSON.parse(localStorage.getItem("checkoutPayload") || "null");
        setPayload(p);
        // optionally fetch product detail again to show names/prices
    }, []);

    if (!payload) return (<div className="min-h-screen flex items-center justify-center">No item selected.</div>);

    // fetch product detail if required
    // for demo assume fetch
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`/api/products/${payload.productSlug}`)
            .then(r => r.json())
            .then(setProduct)
            .catch(console.error);
    }, [payload]);

    if (!product) return (<div className="min-h-screen flex items-center justify-center">Loading...</div>);

    const variant = product.variants.find(v => v.id === payload.variantId);
    const plan = product.emiPlans.find(pl => pl.id === payload.planId);

    return (
        <>
            <NavBar />
            <main className="max-w-4xl mx-auto px-6 py-10">
                <div className="bg-white rounded-xl border p-6">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <img src={variant.image || product.image} alt={product.name} className="w-full h-40 object-contain" />
                        </div>
                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-[#2E3A45]">{product.name}</div>
                                    <div className="text-xs text-[#2E3A45]/60">{variant.storage} • {variant.color}</div>
                                </div>
                                <div className="text-sm text-[#2E3A45]">₹{variant.price.toLocaleString()}</div>
                            </div>

                            <div className="mt-4">
                                <div className="text-sm text-[#2E3A45]/70">Selected Plan: {plan.tenure} months • {plan.interest}%</div>
                                <div className="text-lg font-bold mt-2">Monthly: ₹{Math.round((variant.price * (1 + plan.interest / 100)) / plan.tenure).toLocaleString()}</div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="bg-[#63C070] text-white py-2 px-4 rounded-lg">Confirm & Pay</button>
                                <button className="border border-[#E6ECE6] py-2 px-4 rounded-lg">Modify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
