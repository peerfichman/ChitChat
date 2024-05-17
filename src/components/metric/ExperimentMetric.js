import React, { useState, useEffect } from 'react';
import ExperimentGraph from './ExperimentGraph';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './GraphStatistics';
import ExperimentTable from './ExperimentTable';
import UserSentimentGraph from './UserSentimentGraph';
import DownloadCSVButton from './DownloadCSVButton';
import PageTitle from '../PageTitle';
import { ViewOptions } from '../../constants/metricsConstants';
import Tab from '../Tab';
import { getNeo4jGraph } from '../../requests/metric';
import { createGraph } from './utils/graphUtils';
import Loading from './../Loading';

const ExperimentMetric = () => {
    let { id } = useParams();
    const [viewOptions, setViewOptions] = useState(ViewOptions.STATISTICS.id);
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getNeo4jGraph(id)
            .then((response) => {
                setGraph(createGraph(response.records));
                setIsLoading(false);
            })
            .catch((e) => {
                console.error('Failed to fetch graph data:', e);
            });
    }, [id]); // Re-fetch when id changes

    const viewDict = {
        [ViewOptions.STATISTICS.id]: <ExperimentStatistics graph={graph} />,
        [ViewOptions.GRAPH.id]: <ExperimentGraph graph={graph} />,
        [ViewOptions.TABLE.id]: <ExperimentTable id={id} />,
        [ViewOptions.SENTIMENT_GRAPH.id]: <UserSentimentGraph id={id} />,
    };

    const handleTabChange = (tabID) => {
        setViewOptions(tabID);
    };
    if (isLoading) {
        return <Loading />;
    }

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
