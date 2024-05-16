import React from 'react';
import ExperimentGraph from './ExperimentGraph';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './ExperimentStatistics';
import ExperimentTable from './ExperimentTable';
import UserSentimentGraph from './UserSentimentGraph';
import DownloadCSVButton from './DownloadCSVButton';
import PageTitle from '../PageTitle';
import { ViewOptions } from '../../constants/metricsConstants';
import Tab from '../Tab';
const ExperimentMetric = () => {
    let { id } = useParams();
    const [viewOptions, setViewOptions] = React.useState(
        ViewOptions.STATISTICS.id,
    );

    const viewDict = {
        [ViewOptions.STATISTICS.id]: <ExperimentStatistics id={id} />,
        [ViewOptions.GRAPH.id]: <ExperimentGraph id={id} />,
        [ViewOptions.TABLE.id]: <ExperimentTable id={id} />,
        [ViewOptions.SENTIMENT_GRAPH.id]: <UserSentimentGraph id={id} />,
    };

    const handleTabChange = (tabID) => {
        setViewOptions(tabID);
    };

    return (
        <div className="mb-10 flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Experiment Results</PageTitle>
            <div className="flex w-11/12 flex-col">
                <div className="">
                    <Tab
                        handleTabChange={handleTabChange}
                        Tabs={Object.values(ViewOptions)}
                        activated={viewOptions}
                    />
                </div>
                <div className="flex justify-center border-x border-b bg-white py-3">
                    {viewDict[viewOptions]}
                </div>
            </div>
            <DownloadCSVButton collectionId={id} experimentName="messages" />
        </div>
    );
};

export default ExperimentMetric;
