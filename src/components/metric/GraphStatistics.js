import React, { useState } from 'react';
import StatisticsColumn from './StatisticsColumn';

const GraphStatistics = ({ graph }) => {
    const statistics = {
        Nodes: graph.nodes.length,
        total_edges: graph.links.length,
        Positive_Edges: graph.graph.positiveEdges,
        Negative_Edges: graph.graph.negativeEdges,
        Natural_Edges: graph.graph.naturalEdges,
        Diameter: graph.graph.Diameter,
        Radius: graph.graph.Radius,
        Density: graph.graph.density,
        averageClustering: graph.graph.averageClustering,
        reciprocity: graph.graph.reciprocity,
        transitivity: graph.graph.transitivity,
        pathLength: graph.graph.pathLength,
    };

    return (
        <div className="flex h-full w-full flex-col gap-3 pb-3">
            <p className="px-3 text-2xl font-bold text-gray-700">
                Global Measures
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
                        value={`${Math.round(statistics['Positive_Edges'] * 100)}%`}
                    />
                    <StatisticsColumn
                        title={'Negative Edges'}
                        value={`${Math.round(statistics['Negative_Edges'] * 100)}%`}
                    />
                    <StatisticsColumn
                        title={'Natural Edges'}
                        value={`${Math.round(statistics['Natural_Edges'] * 100)}%`}
                    />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4 xl:grid-cols-4">
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
                        title={'Path Length'}
                        value={statistics['pathLength']}
                    />
                </div>
            </div>
            <p className="px-3 pt-3 text-2xl font-bold text-gray-700">
                Local Measures
            </p>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <StatisticsColumn
                        title={'Avg. Clustering'}
                        value={statistics['averageClustering']}
                    />
                    <StatisticsColumn
                        title={'Reciprocity'}
                        value={statistics['reciprocity']}
                    />
                    <StatisticsColumn
                        title={'Transitivity'}
                        value={statistics['transitivity']}
                    />
                </div>
            </div>
        </div>
    );
};

export default GraphStatistics;
