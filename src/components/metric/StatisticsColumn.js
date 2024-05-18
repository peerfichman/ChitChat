import React from 'react';
import DetailObject from './../DetailObject';

const StatisticsColumn = ({ title, value }) => {
    return (
        <div className="w-40 rounded-lg border bg-slate-300 bg-opacity-45 shadow-md">
            <div className="max-w-96 p-2">
                <p className="mb-2 text-sm">{title}</p>
                {value === '' ? (
                    <br></br>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-3xl font-bold text-slate-500">
                            {value}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default StatisticsColumn;
