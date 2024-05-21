import Head from './table/Head';
import HeadCell from './table/HeadCell';
import Body from './table/Body';
import Row from './table/Row';
import DownloadCSVButton from './DownloadCSVButton';

const ExperimentTable = ({ graph }) => {
    const titles = [
        'Name',
        'Calculated Sentiment',
        'Sum of Sentiments',
        'Number of Messages Sent',
        'Out Degree',
        'Degree',
        'Eccentricity',
        'Betweenness Centrality',
        'Closeness Centrality',
    ];
    let rows = {};
    graph.forEachNode((node_id, attributes) => {
        rows[node_id] = [
            attributes['label'],
            attributes['sentiment'],
            attributes['sentimentSum'],
            attributes['sentimentCount'],
            attributes['outDegree'],
            attributes['degree'],
            attributes['eccentricity'],
            attributes['betweennessCentrality'].toFixed(2),
            attributes['closenessCentrality'].toFixed(2),
        ];
    });
    const details = [
        '',
        '',
        '',
        '',
        'is the number of edges originating from a node.',
        'is the count of its incoming and outgoing edges.',
        'is the maximum distance from it to any other node',
        "measures the extent to which a node lies on the shortest paths between other nodes, indicating its role as a bridge or bottleneck in the network's communication flow.",
        'measures how quickly a node can reach all other nodes, based on the shortest path distances.',
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
