import React, { useState, useEffect } from 'react';
import { getNeo4jGraph } from '../../requests/metric';
import StatisticCard from './StatisticCard';

const GraphStatistics = ({ id }) => {
    const [statistics, setStatistics] = useState({
        Nodes: 0,
        Edges: 0,
        Positive_Edges: 0,
        Negative_Edges: 0,
        Natural_Edges: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNeo4jGraph(id);
                const nodesSet = new Set();
                statistics.Nodes = 0;
                statistics.Edges = 0;
                statistics.Positive_Edges = 0;
                statistics.Negative_Edges = 0;
                statistics.Natural_Edges = 0;
                response.records.forEach((record) => {
                    const node1 = record._fields[record._fieldLookup.p];
                    const node2 = record._fields[record._fieldLookup.q];
                    const relationship = record._fields[record._fieldLookup.r];

                    const node1Id = `${node1.identity.low}_${node1.identity.high}`;
                    const node2Id = `${node2.identity.low}_${node2.identity.high}`;

                    // Add nodes to set for unique counting
                    nodesSet.add(node1Id);
                    nodesSet.add(node2Id);

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

                // Update statistics state
                setStatistics({
                    Nodes: nodesSet.size,
                    Edges: statistics.Edges,
                    Positive_Edges: statistics.Positive_Edges,
                    Negative_Edges: statistics.Negative_Edges,
                    Natural_Edges: statistics.Natural_Edges,
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
