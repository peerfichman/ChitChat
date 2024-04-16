import React, {useEffect, useRef, useState} from 'react';
import Graph from "react-graph-vis";
import {getNeo4jGraph} from "../../requests";

const GraphComponent = ({ id }) => {
    const [graph, setGraph] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNeo4jGraph(id);
                const nodesMap = new Map; // Use Map instead of Set
                const links = [];
                response.records.forEach(record => {
                    const node1 = record._fields[record._fieldLookup.p];
                    const node2 = record._fields[record._fieldLookup.q];
                    const relationship = record._fields[record._fieldLookup.r];

                    const node1Id = `${node1.identity.low}_${node1.identity.high}`;
                    const node2Id = `${node2.identity.low}_${node2.identity.high}`;

                    // Store or update node information in Map by id
                    if (!nodesMap.has(node1Id)) {
                        nodesMap.set(node1Id, { id: node1Id, name: node1.properties.name });
                    }
                    if (!nodesMap.has(node2Id)) {
                        nodesMap.set(node2Id, { id: node2Id, name: node2.properties.name });
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
                    edges: links
                });
            } catch (error) {
                console.error('Failed to fetch graph data:', error);
            }
        };

        fetchData().then(r => console.log(graph.edges));

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
                face: "Calibri"
            }
        },
        edges: {
            smooth: {
                enabled: true,
                type: "continuous",
                forceDirection: "none",
                roundness: 0.5
            },
        },
        autoResize: true,
        interaction: {
            zoomView: true
        },
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                avoidOverlap: 0.8,
                springConstant: 0.001,
                nodeDistance: 100,
                damping: 1.5
            },
            stabilization: {
                iterations: 1000,
                updateInterval: 100,
                onlyDynamicEdges: false,
                fit: true
            },
            solver: 'hierarchicalRepulsion'
        },
    };

    const events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };
    return (
        <Graph style={{width: '100%', height: '100%'}}
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );
};

export default GraphComponent;
