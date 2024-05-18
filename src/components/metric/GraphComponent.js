import React from 'react';
import Graph from 'react-graph-vis';
import { v4 as uuidv4 } from 'uuid';
import { graphOptions } from '../../constants/metricsConstants';
import { GraphAttributes } from '../../constants/metricsConstants';

const GraphComponent = ({ graph, onClickNode }) => {
    const events = {
        select: (event) => {
            if (event.nodes.length > 0) {
                onClickNode(graph.getNodeAttributes(event.nodes[0]));
            }
        },
    };
    return (
        <div className="rounded-2 mx-2 h-[560px] border border-gray-800 bg-slate-200 shadow-md md:w-2/3">
            <Graph
                style={{ width: '100%', height: '100%' }}
                key={uuidv4()}
                graph={graph.getAttribute(GraphAttributes.GRAPH_VIEW)}
                options={graphOptions}
                events={events}
                getNetwork={(network) => {}}
            />
        </div>
    );
};

export default GraphComponent;
