import React, { useState } from 'react';

import StatisticsColumn from './StatisticsColumn';
import { GraphAttributes } from '../../constants/metricsConstants';

const GraphStatistics = ({ graph }) => {
    const [statistics, setStatistics] = useState({
        Nodes: graph.order,
        total_edges: graph.size,
        Positive_Edges: graph.getAttribute(GraphAttributes.POSITIVE_EDGES),
        Negative_Edges: graph.getAttribute(GraphAttributes.NEGATIVE_EDGES),
        Natural_Edges: graph.getAttribute(GraphAttributes.NATURAL_EDGES),
        Diameter: graph.getAttribute(GraphAttributes.DIAMETER),
        Radius: graph.getAttribute(GraphAttributes.RADIUS),
        Density: graph.getAttribute(GraphAttributes.DENSITY),
        Self_Loops: 0,
        Avg_Betweenness_Centrality: graph.getAttribute(
            GraphAttributes.BETWEENNESS_CENTRALITY,
        ),
        Avg_Closeness_Centrality: graph.getAttribute(
            GraphAttributes.CLOSENESS_CENTRALITY,
        ),
        Avg_Degree_Centrality: graph.getAttribute(
            GraphAttributes.DEGREE_CENTRALITY,
        ),
    });

    return (
        <div className="h-fit">
            {Object.keys(statistics) && (
                <div className="grid grid-cols-3 gap-x-20 gap-y-5 rounded-xl border border-gray-800 bg-slate-200 p-10 shadow-sm ">
                    {Object.keys(statistics).map((key) => (
                        <StatisticsColumn
                            key={key}
                            name={key} // Assuming you want to display the key
                            count={statistics[key]} // Accessing the count value for each key
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GraphStatistics;
