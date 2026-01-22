import React from 'react';

export const TableSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-t-lg mb-1"></div>
            {[...Array(10)].map((_, i) => (
                <div key={i} className="flex space-x-4 border-b border-gray-100 p-4">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
            ))}
        </div>
    );
};
