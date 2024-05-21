const ViewOptions = Object.freeze({
    STATISTICS: { name: 'Statistics', id: 3 },
    GRAPH: { name: 'Graph', id: 1 },
    TABLE: { name: 'Table', id: 2 },
    PARTICIPANT_METRICS: { name: 'Participant Metrics', id: 4 },
    EXPERIMENT_METRICS: { name: 'Experiment Metrics', id: 5 },
});

const GraphAttributes = Object.freeze({
    RADIUS: 'Radius',
    DIAMETER: 'Diameter',
    GRAPH_VIEW: 'graphView',
    BETWEENNESS_CENTRALITY: 'betweennessCentrality',
    CLOSENESS_CENTRALITY: 'closenessCentrality',
    DENSITY: 'density',
    POSITIVE_EDGES: 'positiveEdges',
    NEGATIVE_EDGES: 'negativeEdges',
    NATURAL_EDGES: 'naturalEdges',
});

const NodeAttributes = Object.freeze({
    ID: 'id',
    LABEL: 'label',
    UID: 'uid',
    SENTIMENT: 'sentiment',
    SENTIMENT_SUM: 'sentimentSum',
    SENTIMENT_COUNT: 'sentimentCount',
    DEGREE: 'degree',
    OUT_DEGREE: 'outDegree',
    SIZE: 'size',
    COLOR: 'color',
    ECCENTRICITY: 'eccentricity',
    OPINION_BEFORE: 'opinionBefore',
    OPINION_AFTER: 'opinionAfter',
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

export { ViewOptions, GraphAttributes, NodeAttributes, graphOptions };
