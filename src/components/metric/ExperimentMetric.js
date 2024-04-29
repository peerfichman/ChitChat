import React from 'react';
import ExperimentGraph from './ExperimentGraph';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './ExperimentStatistics';
import ExperimentTable from './ExperimentTable';
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
    };

    const handleTabChange = (tabID) => {
        console.log(ViewOptions.TABLE);
        console.log(tabID);
        setViewOptions(tabID);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100 gap-3 mb-10">
            <PageTitle>Experiment Results</PageTitle>
            <div className="w-5/6 flex flex-col">
                <div className="">
                    <Tab
                        handleTabChange={handleTabChange}
                        Tabs={Object.values(ViewOptions)}
                        activated={viewOptions}
                    />
                </div>
                <div className="flex justify-center bg-white py-3 border-x border-b">
                    {viewDict[viewOptions]}
                </div>
            </div>
            <DownloadCSVButton collectionId={id} experimentName="messages" />
        </div>
    );
};

export default ExperimentMetric;
