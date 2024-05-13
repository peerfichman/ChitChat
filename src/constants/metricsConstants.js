const ViewOptions = Object.freeze({
    STATISTICS: { name: 'Statistics', id: 3 },
    GRAPH: { name: 'Graph', id: 1 },
    TABLE: { name: 'Table', id: 2 },
    SENTIMENT_GRAPH: { name: 'Sentiment Graph', id: 4 },
});

const graphOptions = {
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

export { ViewOptions, graphOptions };
