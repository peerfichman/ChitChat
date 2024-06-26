import DirectedGraph from 'graphology';
import {
    GraphAttributes,
    NodeAttributes,
} from '../../../constants/metricsConstants';
import eccentricity from 'graphology-metrics/node/eccentricity';
import betweennessCentrality from 'graphology-metrics/centrality/betweenness';
import closenessCentrality from 'graphology-metrics/centrality/closeness';
import { directedDensity } from 'graphology-metrics/graph/density';
import { getSurveyResults } from '../../../requests/metric';

const createGraph = (records, exp_id, surveyResults) => {
    const graph = new DirectedGraph({ multi: true });
    records.forEach((record) => {
        const node1Data = record._fields[record._fieldLookup.p];
        const node2Data = record._fields[record._fieldLookup.q];
        const relationship = record._fields[record._fieldLookup.r];
        const node1Id = `${node1Data.identity.low}_${node1Data.identity.high}`;
        const node2Id = `${node2Data.identity.low}_${node2Data.identity.high}`;
        // Store or update node information in Map by id
        if (!graph.hasNode(node1Id)) {
            graph.addNode(node1Id, _createNode(node1Id, node1Data));
        }
        if (!graph.hasNode(node2Id)) {
            graph.addNode(node2Id, _createNode(node2Id, node2Data));
        }

        _changeNodeSentiment(
            graph,
            node1Id,
            relationship.properties.sentimentScore,
        );

        graph.addEdge(node1Id, node2Id, {
            from: node1Id,
            to: node2Id,
            sentiment: relationship.properties.sentimentScore,
            type: relationship.type,
            message: relationship.properties.message,
        });
    });

    _addNodesDegrees(graph.edges(), graph);
    _addNodesAttributes(graph, surveyResults);
    _addGraphAttributes(graph);

    return graph;
};

const _addNodesAttributes = async (graph, surveyResults) => {
    //TODO: Configure how to know which node is the user

    graph.forEachNode((node_id, attr) => {
        graph.setNodeAttribute(
            node_id,
            NodeAttributes.OPINION_BEFORE,
            surveyResults[attr.uid] ? surveyResults[attr.uid].opinion_pre : '-',
        );
        graph.setNodeAttribute(
            node_id,
            NodeAttributes.OPINION_AFTER,
            surveyResults[attr.uid]
                ? surveyResults[attr.uid].opinion_post
                : '-',
        );

        graph.setNodeAttribute(
            node_id,
            NodeAttributes.ECCENTRICITY,
            eccentricity(graph, node_id),
        );
        const degree = graph.getNodeAttribute(node_id, NodeAttributes.DEGREE);
        graph.setNodeAttribute(
            node_id,
            NodeAttributes.SIZE,
            attr.size + degree,
        );

        graph.setNodeAttribute(
            node_id,
            NodeAttributes.COLOR,
            _LightenDarkenColor(
                attr.color,
                20 * graph.getNodeAttribute(node_id, NodeAttributes.SENTIMENT),
            ),
        );
    });

    betweennessCentrality.assign(graph);
    closenessCentrality.assign(graph);
};

const _addGraphAttributes = (graph) => {
    setGraphRadiusAndDiameter(graph);

    graph.setAttribute(GraphAttributes.GRAPH_VIEW, {
        nodes: _createNodesForVisualization(graph),
        edges: _createEdgesForVisualization(graph),
    });
    graph.setAttribute(
        GraphAttributes.BETWEENNESS_CENTRALITY,
        averageCalc(betweennessCentrality(graph, { getEdgeWeight: null })),
    );
    graph.setAttribute(
        GraphAttributes.CLOSENESS_CENTRALITY,
        averageCalc(closenessCentrality(graph)),
    );
    graph.setAttribute(
        GraphAttributes.DENSITY,
        directedDensity(graph).toFixed(2),
    );
    AddEdgesTypes(graph);
};

const averageCalc = (data) => {
    const dataValues = Object.values(data);
    const dataSum = dataValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
    return (dataSum / dataValues.length).toFixed(2);
};

const AddEdgesTypes = (graph) => {
    let positiveEdges = 0;
    let negativeEdges = 0;
    let naturalEdges = 0;
    graph.forEachEdge(
        (
            edge,
            attributes,
            source,
            target,
            sourceAttributes,
            targetAttributes,
        ) => {
            if (attributes.type == 'positive') {
                positiveEdges += 1;
            } else if (attributes.type == 'negative') {
                negativeEdges += 1;
            } else {
                naturalEdges += 1;
            }
        },
    );

    graph.setAttribute(GraphAttributes.POSITIVE_EDGES, positiveEdges);
    graph.setAttribute(GraphAttributes.NEGATIVE_EDGES, negativeEdges);
    graph.setAttribute(GraphAttributes.NATURAL_EDGES, naturalEdges);
};

export { AddEdgesTypes as analyzeSentimentType };

const setGraphRadiusAndDiameter = (graph) => {
    let radius = 100;
    let diameter = 0;
    graph.forEachNode((node, attributes) => {
        let currEccentricity = graph.getNodeAttribute(
            node,
            NodeAttributes.ECCENTRICITY,
        );
        if (currEccentricity == Infinity) {
            diameter = Infinity;
            radius = Infinity;
        }

        if (currEccentricity > diameter && diameter != Infinity) {
            diameter = currEccentricity;
        }
        if (currEccentricity < radius && radius != Infinity) {
            radius = currEccentricity;
        }
    });
    graph.setAttribute(GraphAttributes.RADIUS, radius);
    graph.setAttribute(GraphAttributes.DIAMETER, diameter);
};

const _createNodesForVisualization = (graph) => {
    const nodesForVis = [];
    graph.forEachNode((node, attributes) => {
        nodesForVis.push(attributes);
    });
    return nodesForVis;
};

const _createEdgesForVisualization = (graph) => {
    const edgesForVis = [];
    graph.forEachEdge((edge, attributes) => {
        edgesForVis.push(attributes);
    });
    return edgesForVis;
};

const _changeNodeSentiment = (graph, nodeId, sentimentScore) => {
    graph.updateNode(nodeId, (attr) => {
        const sentimentCount = attr.sentimentCount + 1;
        const sentimentSum = parseFloat(
            parseFloat(attr.sentimentSum) + parseFloat(sentimentScore),
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

const _createNode = (nodeId, nodeData) => {
    return {
        [NodeAttributes.ID]: nodeId,
        [NodeAttributes.LABEL]: nodeData.properties.name,
        [NodeAttributes.UID]: nodeData.properties.uid,
        [NodeAttributes.SENTIMENT_SUM]: 0,
        [NodeAttributes.SENTIMENT_COUNT]: 0,
        [NodeAttributes.SENTIMENT]: 0,
        [NodeAttributes.SIZE]: 13,
        [NodeAttributes.DEGREE]: 0,
        [NodeAttributes.OUT_DEGREE]: 0,
        [NodeAttributes.COLOR]: '#e8e8e8',
        [NodeAttributes.ECCENTRICITY]: 0,
    };
};

export const _LightenDarkenColor = (col, amt) => {
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

const _addNodesDegrees = (edges, graph) => {
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
        graph.updateNode(pair.from, (attr) => {
            return {
                ...attr,
                degree: attr.degree + 1,
                outDegree: attr.outDegree + 1,
            };
        });
        graph.updateNode(pair.to, (attr) => {
            return {
                ...attr,
                degree: attr.degree + 1,
            };
        });
    });
};

export { createGraph };
