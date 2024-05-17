const createGraph = (records) => {
    const nodesMap = new Map(); // Use Map instead of Set
    const links = [];
    records.forEach((record) => {
        const node1Data = record._fields[record._fieldLookup.p];
        const node2Data = record._fields[record._fieldLookup.q];
        const relationship = record._fields[record._fieldLookup.r];
        const node1Id = `${node1Data.identity.low}_${node1Data.identity.high}`;
        const node2Id = `${node2Data.identity.low}_${node2Data.identity.high}`;
        // Store or update node information in Map by id
        if (!nodesMap.has(node1Id)) {
            nodesMap.set(
                node1Id,
                _createNode(node1Id, node1Data.properties.name),
            );
        }
        if (!nodesMap.has(node2Id)) {
            nodesMap.set(
                node2Id,
                _createNode(node2Id, node2Data.properties.name),
            );
        }

        _changeNodeSentiment(
            nodesMap.get(node1Id),
            relationship.properties.sentimentScore,
        );

        links.push({
            from: node1Id,
            to: node2Id,
            sentiment: relationship.properties.sentimentScore,
        });
    });

    _reshapeNodes(links, nodesMap);
    const nodesList = Array.from(nodesMap.values());

    return { nodes: nodesList, edges: links };
};

const _changeNodeSentiment = (node, sentimentScore) => {
    node.sentimentSum += sentimentScore;
    node.sentimentCount += 1;
    node.sentiment = node.sentimentSum / node.sentimentCount;
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

const _increaseSizeAndColor = (node) => {
    node.size += 3;
    node.degree += 1;
    node.color = _LightenDarkenColor(node.color, -15);
};

const _reshapeNodes = (links, nodesMap) => {
    const pairs = links.map((link) => {
        return {
            from: link.from,
            to: link.to,
        };
    });
    const uniquePairs = Array.from(
        new Set(pairs.map(JSON.stringify)),
        JSON.parse,
    );

    uniquePairs.forEach((pair) => {
        _increaseSizeAndColor(nodesMap.get(pair.from));
    });
};

export { createGraph };
