import DetailObject from '../DetailObject';
import { HiExclamationCircle } from 'react-icons/hi';
import NodeCardToolTip from './NodeCardToolTip';

const NodeCard = ({ node }) => {
    return (
        <div className="rounded-2 w-2/3 bg-white p-3 md:w-1/3 ">
            <h1 className="text-xl font-bold">Node Details</h1>
            <DetailObject title="Name" value={node.label} />
            <DetailObject
                title="Calculated Sentiment"
                value={node.sentiment && parseFloat(node.sentiment).toFixed(2)}>
                <NodeCardToolTip
                    Icon={HiExclamationCircle}
                    details={{
                        beforeBolt: 'This Attribute affects the',
                        bolt: 'color',
                        afterBolt: 'of the node.',
                    }}
                    title={''}
                />
            </DetailObject>
            <DetailObject title="Messages Sent" value={node.sentimentCount} />
            <DetailObject title="Degree" value={node.degree}>
                <NodeCardToolTip
                    Icon={HiExclamationCircle}
                    details={{
                        beforeBolt: 'This Attribute affects the',
                        bolt: 'size',
                        afterBolt: 'of the node.',
                    }}
                    title={''}
                />
            </DetailObject>
            <DetailObject title="Out Degree" value={node.outDegree} />
            <DetailObject title="Eccentricity" value={node.eccentricity} />
            <DetailObject
                title="Betweenness Centrality"
                value={
                    node.betweennessCentrality &&
                    parseFloat(node.betweennessCentrality).toFixed(2)
                }
            />
            <DetailObject
                title="Closeness Centrality"
                value={
                    node.closenessCentrality &&
                    parseFloat(node.closenessCentrality).toFixed(2)
                }
            />
            <DetailObject
                title="eccentricity"
                value={
                    node.eccentricity &&
                    parseFloat(node.eccentricity).toFixed(2)
                }
            />
            <DetailObject
                title="Page Rank"
                value={node.PageRank && parseFloat(node.PageRank).toFixed(2)}
            />
            <DetailObject
                title="Eigen Centrality"
                value={
                    node.EigenCentrality &&
                    parseFloat(node.EigenCentrality).toFixed(2)
                }
            />
        </div>
    );
};

export default NodeCard;
