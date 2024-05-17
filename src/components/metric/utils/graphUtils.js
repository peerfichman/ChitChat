import Graph from 'graphology';
import { graph } from 'graphology-library/metrics';

const createGraph = (records) => {
    const nodesMap = new Map(); // Use Map instead of Set
    const links = [];
    const newGraph = new Graph({ multi: true });

    // graph.edges.map((edge) => {
    //     newGraph.addEdge(edge.from, edge.to, { ...edge });
    // });

    records.forEach((record) => {
        const node1Data = record._fields[record._fieldLookup.p];
        const node2Data = record._fields[record._fieldLookup.q];
        const relationship = record._fields[record._fieldLookup.r];
        const node1Id = `${node1Data.identity.low}_${node1Data.identity.high}`;
        const node2Id = `${node2Data.identity.low}_${node2Data.identity.high}`;
        // Store or update node information in Map by id
        if (!newGraph.hasNode(node1Id)) {
            newGraph.addNode(
                node1Id,
                _createNode(node1Id, node1Data.properties.name),
            );
        }
        if (!newGraph.hasNode(node2Id)) {
            newGraph.addNode(
                node2Id,
                _createNode(node2Id, node2Data.properties.name),
            );
        }

        _changeNodeSentiment(
            newGraph,
            node1Id,
            relationship.properties.sentimentScore,
        );

        newGraph.addEdge(node1Id, node2Id, {
            from: node1Id,
            to: node2Id,
            sentiment: relationship.properties.sentimentScore,
        });
    });

    _reshapeNodes(newGraph.edges(), newGraph);
    const nodesForVis = [];
    newGraph.forEachNode((node, attributes) => {
        nodesForVis.push(attributes);
    });
    const edgesForVis = [];
    newGraph.forEachEdge((edge, attributes) => {
        edgesForVis.push(attributes);
    });
    newGraph.setAttribute('nodesForVisualization', nodesForVis);
    newGraph.setAttribute('edgesForVisualization', edgesForVis);
    console.log('newGraph: ', newGraph.getAttribute('nodesForVisualization'));
    console.log('newGraph: ', newGraph.getAttribute('edgesForVisualization'));
    console.log('newGraph: ', newGraph);
    return newGraph;
};

const _changeNodeSentiment = (graph, nodeId, sentimentScore) => {
    graph.updateNode(nodeId, (attr) => {
        const sentimentCount = attr.sentimentCount + 1;
        const sentimentSum = parseFloat(
            attr.sentimentSum + sentimentScore,
        ).toFixed(2);
        const sentiment = parseFloat(sentimentSum / sentimentCount).toFixed(2);
        return {
            ...attr,
            sentimentSum,
            sentimentCount,
            sentiment,
        };
    });
};

const _createNode = (nodeId, nodeName) => {
    return {
        id: nodeId,
        label: nodeName,
        sentimentSum: 0,
        sentimentCount: 0,
        sentiment: 0,
        size: 13,
        degree: 0,
        color: '#e8e8e8',
    };
};

const _LightenDarkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] == '#') {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

const _increaseSizeAndColor = (graph, nodeId) => {
    graph.updateNode(nodeId, (attr) => {
        return {
            ...attr,
            size: attr.size + 3,
            degree: attr.degree + 1,
            color: _LightenDarkenColor(attr.color, -15),
        };
    });
};

const _reshapeNodes = (edges, graph) => {
    const pairs = edges.map((edge) => {
        const edgeAtributes = graph.getEdgeAttributes(edge);

        return {
            from: edgeAtributes.from,
            to: edgeAtributes.to,
        };
    });
    const uniquePairs = Array.from(
        new Set(pairs.map(JSON.stringify)),
        JSON.parse,
    );

    uniquePairs.forEach((pair) => {
        _increaseSizeAndColor(graph, pair.from);
    });
};

export { createGraph };
