import DetailObject from '../DetailObject';

const NodeCard = ({ node }) => {
    return (
        <div className="rounded-2 w-2/3 bg-white p-3 md:w-1/3 ">
            <h1 className="text-xl font-bold">Node Details</h1>
            <DetailObject title="Name" value={node.label} />
            <DetailObject
                title="Calculated Sentiment"
                value={parseFloat(node.sentiment).toFixed(2)}
            />
            <DetailObject title="Messages Sent" value={node.sentimentCount} />
            <DetailObject title="Degree" value={node.degree} />
            <DetailObject
                title="Betweenness Centrality"
                value={parseFloat(node.betweennessCentrality).toFixed(2)}
            />
            <DetailObject
                title="Closeness Centrality"
                value={parseFloat(node.closenessCentrality).toFixed(2)}
            />
        </div>
    );
};

export default NodeCard;
