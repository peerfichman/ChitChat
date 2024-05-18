import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import NodeCard from './NodeCard';

const ExperimentGraph = ({ graph }) => {
    const [isEmpty, setIsEmpty] = useState(false);

    const [selectedNode, setSelectedNode] = useState({
        label: '',
        sentiment: '',
        sentimentCount: '',
        degree: '',
    });

    return (
        !isEmpty && (
            <div className="flex h-fit w-full flex-col items-center gap-3 lg:flex-row lg:items-start lg:justify-evenly">
                {selectedNode && <NodeCard node={selectedNode} />}
                <GraphComponent
                    graph={graph}
                    onClickNode={setSelectedNode}
                    setIsEmpty={setIsEmpty}
                />
            </div>
        )
    );
};

export default ExperimentGraph;
