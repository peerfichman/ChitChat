import Head from './table/Head';
import HeadCell from './table/HeadCell';
import Body from './table/Body';
import Row from './table/Row';

const ExperimentTable = ({ graph }) => {
    let titles = [];
    let rows = {};

    graph.forEachNode((node, attributes) => {
        titles = Object.keys(attributes);
        console.log('titles', titles);
        let row = Object.values(attributes);
        row = row.filter(
            (value) =>
                (value !== node) &
                (value !== attributes.size) &
                (value !== attributes.color) &
                (value !== attributes.degreeCentrality),
        );
        row[6] = row[6].toFixed(2);
        row[7] = row[7].toFixed(2);
        rows[node] = row;
    });
    titles = titles.filter(
        (title) =>
            (title !== 'id') &
            (title !== 'size') &
            (title !== 'color') &
            (title !== 'degreeCentrality'),
    );
    titles = titles.map((title) => {
        if (title === 'sentimentSum') return 'Sentiment Sum';
        if (title === 'label') return 'Name';
        if (title === 'sentimentCount') return 'Sentiment Count';
        if (title === 'closenessCentrality') return 'Closeness Centrality';
        if (title === 'betweennessCentrality') return 'Betweenness Centrality';
        return title;
    });
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                    <div className="overflow-hidden rounded-lg border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <Head>
                                {titles.map((title) => (
                                    <HeadCell key={title} title={title} />
                                ))}
                            </Head>
                            <Body>
                                {Object.keys(rows).map((key) => (
                                    <Row key={key} row={rows[key]} />
                                ))}
                            </Body>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperimentTable;
