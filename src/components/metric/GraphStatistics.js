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
        Self_Loops: graph.selfLoopCount,
    });

    return (
        <div className="flex h-full w-full flex-col">
            <p className="px-3 text-2xl font-bold text-gray-700">
                Graph Measures
            </p>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <StatisticsColumn
                        title={'Nodes'}
                        value={statistics['Nodes']}
                    />
                    <StatisticsColumn
                        title={'Edges'}
                        value={statistics['total_edges']}
                    />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <StatisticsColumn
                        title={'Positive Edges'}
                        value={statistics['Positive_Edges']}
                    />
                    <StatisticsColumn
                        title={'Negative Edges'}
                        value={statistics['Negative_Edges']}
                    />
                    <StatisticsColumn
                        title={'Natural Edges'}
                        value={statistics['Natural_Edges']}
                    />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <StatisticsColumn
                        title={'Diameter'}
                        value={statistics['Diameter']}
                    />
                    <StatisticsColumn
                        title={'Radius'}
                        value={statistics['Radius']}
                    />
                    <StatisticsColumn
                        title={'Density'}
                        value={statistics['Density']}
                    />
                    <StatisticsColumn
                        title={'Self Loops'}
                        value={statistics['Self_Loops']}
                    />
                </div>
            </div>
        </div>
    );
};

export default GraphStatistics;
