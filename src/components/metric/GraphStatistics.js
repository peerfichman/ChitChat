import React, { useState, useEffect } from 'react';
import { getNeo4jGraph } from '../../requests/metric';
import Graph from 'graphology';
import { density } from 'graphology-metrics/graph/density';
import diameter from 'graphology-metrics/graph/diameter';
import eccentricity from 'graphology-metrics/node/eccentricity';
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import closenessCentrality from 'graphology-metrics/centrality/closeness';
import { degreeCentrality } from 'graphology-metrics/centrality/degree';
import StatisticsColumn from './StatisticsColumn';
import { analyzeSentimentType } from './utils/statisticsUtils';
const averageCalc = (data) => {
    const dataValues = Object.values(data);
    const dataSum = dataValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
    return dataSum / dataValues.length;
};
const GraphStatistics = ({ graph }) => {
    const [statistics, setStatistics] = useState({
        Nodes: 0,
        total_edges: graph.edges.length,
        Positive_Edges: 0,
        Negative_Edges: 0,
        Natural_Edges: 0,
        Diameter: 0,
        Radius: 0,
        Density: 0,
        Self_Loops: 0,
        Avg_Betweenness_Centrality: 0,
        Avg_Closeness_Centrality: 0,
        Avg_Degree_Centrality: 0,
    });
    console.log('graph: ', graph);

    useEffect(() => {
        const newGraph = new Graph({ multi: true });
        graph.nodes.map((node) => {
            newGraph.addNode(node.id, { ...node });
        });
        graph.edges.map((edge) => {
            newGraph.addEdge(edge.from, edge.to, { ...edge });
        });

        console.log('newgraph: ', newGraph);
        setStatistics(analyzeSentimentType(graph.edges, statistics));

        // let radius = eccentricity(newGraph);

        // nodesSet.forEach((node) => {
        //     let currRadius = eccentricity(graph, node);
        //     if (currRadius < radius) {
        //         radius = currRadius;
        //     }
        // });
        // const betweennessCentralisesAvg = averageCalc(
        //     betweennessCentrality(graph, { getEdgeWeight: null }),
        // );
        // const closenessCentralisesAvg = averageCalc(closenessCentrality(graph));
        // const degreeCentralisesAvg = averageCalc(degreeCentrality(graph));
        // // Update statistics state
        // setStatistics({
        //     Nodes: graph.order,
        //     Edges: graph.size,
        //     Positive_Edges: statistics.Positive_Edges,
        //     Negative_Edges: statistics.Negative_Edges,
        //     Natural_Edges: statistics.Natural_Edges,
        //     Self_Loops: graph.selfLoopCount,
        //     Diameter: diameter(graph),
        //     Radius: radius,
        //     Density: density(graph).toFixed(3),
        //     Avg_Betweenness_Centrality: betweennessCentralisesAvg.toFixed(3),
        //     Avg_Closeness_Centrality: closenessCentralisesAvg.toFixed(3),
        //     Avg_Degree_Centrality: degreeCentralisesAvg.toFixed(3),
        // });
    }, [graph]);

    // Render or return statistics as needed
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
