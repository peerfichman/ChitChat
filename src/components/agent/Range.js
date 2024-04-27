import React from 'react';
const Range = ({ title, value, setValue, min, max, agentField }) => {
    return (
        <div>
            <label className="block text-lg font-medium ml-1">{title}</label>
            <div className="flex flex-row gap-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) =>
                        setValue(parseInt(e.target.value), agentField)
                    }
                    step={1}
                    className="w-full"
                />
                <p>{value}</p>
            </div>
        </div>
    );
};

export default Range;
