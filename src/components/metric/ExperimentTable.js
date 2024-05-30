import Head from './table/Head';
import HeadCell from './table/HeadCell';
import Body from './table/Body';
import Row from './table/Row';
import DownloadCSVButton from './DownloadCSVButton';

const ExperimentTable = ({ graph }) => {
    const titles = [
        'Name',
        'Calculated Sentiment',
        'Number of Messages Sent',
        'Opinion Before',
        'Opinion After',
        'Out Degree',
        'Degree',
        'Eccentricity',
        'Betweenness Centrality',
        'Closeness Centrality',
        'Eigen Centrality',
        'Page Rank',
    ];
    let rows = {};
    graph.nodes.map((node) => {
        rows[node['id']] = [
            node['label'],
            node['sentiment'],
            node['sentimentCount'],
            node['opinion_pre'],
            node['opinion_post'],
            node['outDegree'],
            node['degree'],
            node['eccentricity'],
            node['betweennessCentrality'].toFixed(2),
            node['closenessCentrality'].toFixed(2),
            node['EigenCentrality'],
            node['PageRank'],
        ];
    });
    const details = [
        '',
        '',
        '',
        '',
        '',
        'is the number of edges originating from a node.',
        'is the count of its incoming and outgoing edges.',
        'is the maximum distance from it to any other node',
        "measures the extent to which a node lies on the shortest paths between other nodes, indicating its role as a bridge or bottleneck in the network's communication flow.",
        'measures how quickly a node can reach all other nodes, based on the shortest path distances.',
        'measures the influence of a node based on the number and quality of its connections.',
        'evaluates the importance of a node based on the importance of its neighbors and their connections',
    ];

    return (
        <div className="flex w-11/12 flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                    <div className="overflow-hidden rounded-lg border">
                        <div className=" min-w-full divide-y divide-gray-200">
                            <Head>
                                {titles.map((title, index) => (
                                    <HeadCell
                                        key={index}
                                        title={title}
                                        details={details[index]}
                                    />
                                ))}
                            </Head>
                            <Body>
                                {Object.keys(rows).map((key) => (
                                    <Row key={key} row={rows[key]} />
                                ))}
                            </Body>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pr-2 pt-2">
                <DownloadCSVButton
                    data={Object.values(rows)}
                    headers={titles}
                    filename={'Participants info Table'}
                />
            </div>
        </div>
    );
};

export default ExperimentTable;
