import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import { getNeo4jGraph } from '../../requests/metric';
import { v4 as uuidv4 } from 'uuid';
import { createGraph } from './utils/graphUtils';
import { graphOptions } from '../../constants/metricsConstants';

const GraphComponent = ({ id, onClickNode, setIsEmpty }) => {
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    useEffect(() => {
        getNeo4jGraph(id)
            .then((response) => {
                setGraph(createGraph(response.records));
                setIsEmpty(false);
            })
            .catch((e) => {
                console.error('Failed to fetch graph data:', e);
            });
    }, [id]); // Re-fetch when id changes

    const events = {
        select: (event) => {
            if (event.nodes.length > 0) {
                const node = graph.nodes.find(
                    (node) => node.id === event.nodes[0],
                );
                onClickNode(node);
            }
        },
    };

    return (
        <div className="rounded-2 h-96 border border-gray-800 bg-slate-200 shadow-md md:w-1/2">
            <Graph
                style={{ width: '100%', height: '100%' }}
                key={uuidv4()}
                graph={graph}
                options={graphOptions}
                events={events}
                getNetwork={(network) => {}}
            />
        </div>
    );
};

export default GraphComponent;
