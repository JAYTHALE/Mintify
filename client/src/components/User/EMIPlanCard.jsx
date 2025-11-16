// src/components/EMIPlanCard.jsx
import React from "react";

export default function EMIPlanCard({ plan, selected, onSelect }) {
    // plan: {id, tenure, interest, monthly, cashback, note}
    return (
        <div
            onClick={() => onSelect(plan.id)}
            className={`cursor-pointer p-4 rounded-xl border ${selected ? "border-[#63C070] shadow-md" : "border-[#E6ECE6]"} transition`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-semibold text-[#2E3A45]">{plan.tenure} months</div>
                    <div className="text-xs text-[#2E3A45]/60">{plan.interest}% interest</div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-[#2E3A45]">₹{plan.monthly.toLocaleString()}</div>
                    {plan.cashback && <div className="text-xs text-[#63C070]/90 mt-1">Cashback ₹{plan.cashback}</div>}
                </div>
            </div>
            {plan.note && <div className="mt-2 text-xs text-[#2E3A45]/60">{plan.note}</div>}
        </div>
    );
}
