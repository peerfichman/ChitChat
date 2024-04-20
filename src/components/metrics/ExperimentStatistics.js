import React, { useState, useEffect } from 'react';
import { getNeo4jGraph } from '../../requests/metric';
import StatisticCard from './StatisticCard';
import Graph from 'graphology';
import { density } from 'graphology-metrics/graph/density';
import diameter from 'graphology-metrics/graph/diameter';
import eccentricity from 'graphology-metrics/node/eccentricity';
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import closenessCentrality from 'graphology-metrics/centrality/closeness';
import { degreeCentrality } from 'graphology-metrics/centrality/degree';

const averageCalc = (data) => {
    const dataValues = Object.values(data);
    const dataSum = dataValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
    return dataSum / dataValues.length;
};
const GraphStatistics = ({ id }) => {
    const [statistics, setStatistics] = useState({
        Nodes: 0,
        Edges: 0,
        Positive_Edges: 0,
        Negative_Edges: 0,
        Natural_Edges: 0,
    });

    useEffect(() => {
        const graph = new Graph({ multi: true });
        const fetchData = async () => {
            try {
                const response = await getNeo4jGraph(id);
                const nodesSet = new Set();
                statistics.Nodes = 0;
                statistics.Edges = 0;
                statistics.Positive_Edges = 0;
                statistics.Negative_Edges = 0;
                statistics.Natural_Edges = 0;
                statistics.Diameter = 0;
                statistics.Radius = 0;
                statistics.Density = 0;
                statistics.Self_Loops = 0;
                statistics.Avg_Betweenness_Centrality = 0;
                statistics.Avg_Closeness_Centrality = 0;
                statistics.Avg_Degree_Centrality = 0;
                response.records.forEach((record) => {
                    const node1 = record._fields[record._fieldLookup.p];
                    const node2 = record._fields[record._fieldLookup.q];
                    const relationship = record._fields[record._fieldLookup.r];

                    const node1Id = `${node1.identity.low}${node1.identity.high}`;
                    const node2Id = `${node2.identity.low}${node2.identity.high}`;

                    if (!nodesSet.has(node1Id)) {
                        graph.addNode(node1Id);
                        nodesSet.add(node1Id);
                    }

                    if (!nodesSet.has(node2Id)) {
                        graph.addNode(node2Id);
                        nodesSet.add(node2Id);
                    }

                    graph.addEdge(node1Id, node2Id);
                    statistics.Edges += 1;

                    // Count positive, negative, and natural edges
                    if (relationship.properties.sentimentScore > 0.2) {
                        statistics.Positive_Edges += 1;
                    } else if (relationship.properties.sentimentScore < -0.2) {
                        statistics.Negative_Edges += 1;
                    } else {
                        // Assuming a sentimentScore of 0 means a natural edge
                        statistics.Natural_Edges += 1;
                    }
                });
                let radius = eccentricity(graph, Array.from(nodesSet)[0]);
                nodesSet.forEach((node) => {
                    let currRadius = eccentricity(graph, node);
                    if (currRadius < radius) {
                        radius = currRadius;
                    }
                });

                const betweennessCentralisesAvg = averageCalc(
                    betweennessCentrality(graph, { getEdgeWeight: null }),
                );
                const closenessCentralisesAvg = averageCalc(
                    closenessCentrality(graph),
                );
                const degreeCentralisesAvg = averageCalc(
                    degreeCentrality(graph),
                );

                // Update statistics state
                setStatistics({
                    Nodes: graph.order,
                    Edges: graph.size,
                    Positive_Edges: statistics.Positive_Edges,
                    Negative_Edges: statistics.Negative_Edges,
                    Natural_Edges: statistics.Natural_Edges,
                    Self_Loops: graph.selfLoopCount,
                    Diameter: diameter(graph),
                    Radius: radius,
                    Density: density(graph),
                    Avg_Betweenness_Centrality: betweennessCentralisesAvg,
                    Avg_Closeness_Centrality: closenessCentralisesAvg,
                    Avg_Degree_Centrality: degreeCentralisesAvg,
                });
            } catch (error) {
                console.error('Failed to fetch graph data:', error);
            }
        };

        fetchData();
    }, [id]);

    // Render or return statistics as needed
    return (
        Object.keys(statistics) && (
            <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(statistics).map((key) => (
                    <StatisticCard
                        key={key}
                        name={key} // Assuming you want to display the key
                        count={statistics[key]} // Accessing the count value for each key
                    />
                ))}
            </div>
        )
    );
};

export default GraphStatistics;
