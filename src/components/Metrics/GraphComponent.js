import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { getNeo4jGraph } from '../../requests/metric';
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
                    // const relationship = record._fields[record._fieldLookup.r];

                    const node1Id = `${node1.identity.low}_${node1.identity.high}`;
                    const node2Id = `${node2.identity.low}_${node2.identity.high}`;

                    // Store or update node information in Map by id
                    if (!nodesMap.has(node1Id)) {
                        nodesMap.set(node1Id, {
                            id: node1Id,
                            name: node1.properties.name,
                        });
                    }
                    if (!nodesMap.has(node2Id)) {
                        nodesMap.set(node2Id, {
                            id: node2Id,
                            name: node2.properties.name,
                        });
                    }

                    // Add link
                    links.push({ from: node1Id, to: node2Id });
                });

                const nodeArray = Array.from(nodesMap.values());

                console.log(nodeArray);
                console.log(links);
                // Convert Map values to an array for the nodes
                setGraph({
                    nodes: nodeArray,
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
            color: '#6366f1',
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
                style={{ width: '100%', height: '100%' }}
                key={uuidv4()}
                graph={graph}
                options={options}
                events={events}
                getNetwork={(network) => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                }}
            />
        )
    );
};

export default GraphComponent;
