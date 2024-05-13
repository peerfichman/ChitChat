import DetailObject from '../DetailObject';

const NodeCard = ({ node }) => {
    console.log(node);
    return (
        <div className="rounded-2 w-2/3 bg-white p-3 md:w-1/3 ">
            <h1 className="text-xl font-bold">Node Details</h1>
            <DetailObject title="Name" value={node.label} />
            <DetailObject title="Calculated Sentiment" value={node.sentiment} />
            <DetailObject title="Messages Sent" value={node.sentimentCount} />
            <DetailObject title="Node Degree" value={node.degree} />
        </div>
    );
};

export default NodeCard;
