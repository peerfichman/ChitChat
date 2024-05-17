const analyzeSentimentType = (edges, statistics) => {
    let positiveEdges = 0;
    let negativeEdges = 0;
    let naturalEdges = 0;
    edges.map((edge) => {
        if (edge.sentiment > 0.2) {
            positiveEdges += 1;
        } else if (edge.sentiment < -0.2) {
            negativeEdges += 1;
        } else {
            naturalEdges += 1;
        }
    });
    return {
        ...statistics,
        Positive_Edges: positiveEdges,
        Negative_Edges: negativeEdges,
        Natural_Edges: naturalEdges,
    };
};

export { analyzeSentimentType };
