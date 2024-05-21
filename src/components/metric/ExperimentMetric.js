import React, { useState, useEffect } from 'react';
import ExperimentGraph from './ExperimentGraph';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './GraphStatistics';
import ExperimentTable from './ExperimentTable';
import UserSentimentGraph from './UserSentimentGraph';
import PageTitle from '../PageTitle';
import { ViewOptions } from '../../constants/metricsConstants';
import Tab from '../Tab';
import { getNeo4jGraph } from '../../requests/metric';
import { createGraph } from './utils/graphUtils';
import Loading from './../Loading';
import { getMessagesByCollectionId } from '../../requests/FireBase';
import AllMessagesGraphs from './AllMessagesGraphs';

const ExperimentMetric = () => {
    let { id } = useParams();
    const [viewOptions, setViewOptions] = useState(ViewOptions.TABLE.id);
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getNeo4jGraph(id)
            .then((response) => {
                setGraph(createGraph(response.records));
                setIsLoading(false);
            })
            .catch((e) => {
                console.error('Failed to fetch graph data:', e);
            });
        getMessagesByCollectionId(id).then((messages) => {
            setData(messages.filter((message) => message.name !== 'ChitChat'));

            let allNames = messages.map((obj) => obj.name);
            allNames = allNames.filter((name) => name !== 'ChitChat');
            const uniqueNames = [...new Set(allNames)];
            setUsers(uniqueNames);
        });
    }, [id]); // Re-fetch when id changes

    const viewDict = {
        [ViewOptions.STATISTICS.id]: <ExperimentStatistics graph={graph} />,
        [ViewOptions.GRAPH.id]: <ExperimentGraph graph={graph} />,
        [ViewOptions.TABLE.id]: <ExperimentTable graph={graph} />,
        [ViewOptions.PARTICIPANT_METRICS.id]: (
            <UserSentimentGraph data={data} users={users} />
        ),
        [ViewOptions.EXPERIMENT_METRICS.id]: <AllMessagesGraphs data={data} />,
    };

    const handleTabChange = (tabID) => {
        setViewOptions(tabID);
    };
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="mb-20 flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
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
        </div>
    );
};

export default ExperimentMetric;
