import React from 'react';

const EngagementLevelRange = ({
    newEngagementLevel,
    modifyEngagementLevel,
}) => {
    console.log(newEngagementLevel);
    return (
        <div>
            <label className="block text-lg font-medium ml-1">
                Level of Engagement
            </label>
            <div className="flex flex-row gap-1">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={newEngagementLevel * 100}
                    onChange={(e) => modifyEngagementLevel(e.target.value)}
                    step={25}
                    className="w-full"
                />
                <p>{newEngagementLevel * 100}%</p>
            </div>
        </div>
    );
};

export default EngagementLevelRange;
