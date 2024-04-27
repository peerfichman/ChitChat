import React from 'react';


const StatisticsColumn = ({name, count}) => {
    return (
        <div className="flex justify-content-between">
            <p className="pr-10 font-bold">{name.replace(/_/g, ' ')}</p>
            <p>{count}</p>
        </div>
    )
}
export default StatisticsColumn;