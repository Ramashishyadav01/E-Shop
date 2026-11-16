import React, { useState, useEffect } from "react";

const ProductSkeletonCard = () => {
    return (
        <div className="rounded-lg shadow-md border border-gray-100 overflow-hidden bg-white animate-pulse">
            <div className="w-full h-72 bg-gradient-to-br from-gray-200 to-gray-300" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="pt-2 flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded w-16" />
                    <div className="h-7 bg-gray-200 rounded w-16" />
                </div>
            </div>
        </div>
    );
};

const ProductSkeletonGrid = ({ count = 8 }) => {
    const [isSlow, setIsSlow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSlow(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full">
            {isSlow && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3 text-blue-900 transition-all duration-300">
                    <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping shrink-0" />
                    <div className="text-sm">
                        <p className="font-semibold">Connecting to cloud server...</p>
                        <p className="text-blue-700 text-xs mt-0.5">
                            Our backend is hosted on a free cloud instance waking up from sleep. It will load in just a few seconds!
                        </p>
                    </div>
                </div>
            )}
            <div className="pb-6 pt-6 grid 2xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <ProductSkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
};

export default ProductSkeletonGrid;
