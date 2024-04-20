import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import {getCSV, getNeo4jGraph} from '../../requests/metric';
import { v4 as uuidv4 } from 'uuid';

const GraphComponent = ({ id }) => {
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    const [isEmpty, setIsEmpty] = useState(true);


    useEffect(() => {
        getNeo4jGraph(id)
            .then((response) => {
                const nodesMap = new Map(); // Use Map instead of Set
                const links = [];
                response.records.forEach((record) => {
                    const node1 = record._fields[record._fieldLookup.p];
                    const node2 = record._fields[record._fieldLookup.q];
                    const relationship = record._fields[record._fieldLookup.r];

                    const node1Id = `${node1.identity.low}_${node1.identity.high}`;
                    const node2Id = `${node2.identity.low}_${node2.identity.high}`;

                    // Store or update node information in Map by id
                    if (!nodesMap.has(node1Id)) {
                        nodesMap.set(node1Id, {
                            id: node1Id,
                            label: node1.properties.name,
                            sentimentSum: 0,
                            sentimentCount: 0,
                            sentiment: 0,
                            color: '#b2b4b3'
                        });
                    }
                    if (!nodesMap.has(node2Id)) {
                        nodesMap.set(node2Id, {
                            id: node2Id,
                            label: node2.properties.name,
                            sentimentSum: 0,
                            sentimentCount: 0,
                            sentiment: 0,
                            color: '#b2b4b3'
                        });
                    }

                    if (nodesMap.has(node1Id)) {
                        const node1 = nodesMap.get(node1Id);
                        node1.sentimentSum += relationship.properties.sentimentScore; // Add current score to sum
                        node1.sentimentCount += 1; // Increment count
                        node1.sentiment = node1.sentimentSum / node1.sentimentCount;
                    }

                    // Add link
                    if(relationship.properties.sentimentScore <= -0.3) {
                        links.push({ from: node1Id, to: node2Id, color: { color:'red', highlight:'red', hover: 'red' }});
                    } else if(relationship.properties.sentimentScore >= 0.3) {
                        links.push({ from: node1Id, to: node2Id, color: { color:'green', highlight:'green', hover: 'green' }});
                    } else {
                        links.push({ from: node1Id, to: node2Id});
                    }

                });

                nodesMap.forEach(node => {
                    if(node.sentiment >= 0.3) {
                        node.color = '#4ac633';
                    } else if(node.sentiment <= -0.3) {
                        node.color = "#ff201e";
                    }
                })

                const nodesList = Array.from(nodesMap.values());

                setGraph({
                    nodes: nodesList,
                    edges: links,
                });

                setIsEmpty(false);
            })
            .catch((e) => {
                console.error('Failed to fetch graph data:', e);
            });
    }, [id]); // Re-fetch when id changes

    const options = {
        layout: {
            randomSeed: 1,
            hierarchical: false,
            improvedLayout: false,
        },
        nodes: {
            shape: 'dot',
            font: {
                size: 12,
                face: 'Calibri',
            },
        },
        edges: {
            smooth: {
                enabled: true,
                type: 'continuous',
                forceDirection: 'none',
                roundness: 0.5,
            },
        },
        autoResize: true,
        interaction: {
            zoomView: true,
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                avoidOverlap: 0.8,
                springConstant: 0.001,
                nodeDistance: 100,
                damping: 1.5,
            },
            stabilization: {
                iterations: 1000,
                updateInterval: 100,
                onlyDynamicEdges: false,
                fit: true,
            },
            solver: 'hierarchicalRepulsion',
        },
    };

    const events = {
        select: function (event) {
            let { nodes, edges } = event;
        },
    };


    return (
        !isEmpty && (
                <Graph
                    style={{width: '100%', height: '100%'}}
                    key={uuidv4()}
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={(network) => {
                    }}
                />
        )
    );
};

export default GraphComponent;
