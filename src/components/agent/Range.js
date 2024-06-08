import React from 'react';
const Range = ({
    title,
    value,
    setValue,
    min,
    max,
    agentField,
    isPrecentage = false,
}) => {
    return (
        <div>
            <label className="ml-1 block text-lg font-medium">{title}</label>
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
                {isPrecentage ? <p>{value}%</p> : <p>{value}</p>}
            </div>
        </div>
    );
};

export default Range;
