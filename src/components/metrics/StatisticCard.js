import React from 'react';
const StatisticCard = ({ name, count }) => {
    return (
        <div className="flex flex-col items-center bg-gray-50 hover:bg-gray-200 border shadow-sm rounded-xl p-4 w-[300px] gap-3">
            <h3 className="text-lg font-bold text-gray-800 ">{name.replace(/_/g, ' ')}</h3>
            <p className="mt-2 text-gray-500 ">{count}</p>
        </div>
    );
};
export default StatisticCard;
