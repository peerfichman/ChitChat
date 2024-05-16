import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import NodeCard from './NodeCard';

const ExperimentGraph = ({ id }) => {
    const [isEmpty, setIsEmpty] = useState(false);

    const [selectedNode, setSelectedNode] = useState({
        label: '',
        sentiment: '',
        sentimentCount: '',
        degree: '',
    });

    return (
        !isEmpty && (
            <div className="flex w-full flex-col items-center gap-3 lg:flex-row lg:items-start lg:justify-evenly">
                {selectedNode && <NodeCard node={selectedNode} />}
                <GraphComponent
                    id={id}
                    onClickNode={setSelectedNode}
                    setIsEmpty={setIsEmpty}
                />
            </div>
        )
    );
};

export default ExperimentGraph;
