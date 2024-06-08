import React, { useState, useEffect } from 'react';
import ExperimentGraph from './ExperimentGraph';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './GraphStatistics';
import ExperimentTable from './ExperimentTable';
import UserSentimentGraph from './UserSentimentGraph';
import PageTitle from '../PageTitle';
import { ViewOptions } from '../../constants/metricsConstants';
import Tab from '../Tab';
import { getSurveyResults, createNetworkXGraph } from '../../requests/metric';
import Loading from './../Loading';
import { getMessagesByCollectionId } from '../../requests/FireBase';
import AllMessagesGraphs from './AllMessagesGraphs';

const ExperimentMetric = () => {
    let { id } = useParams();
    const [viewOptions, setViewOptions] = useState(ViewOptions.STATISTICS.id);
    const [graph, setGraph] = useState({ nodes: [], edges: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getMessagesByCollectionId(id).then((messages) => {
            setData(messages.filter((message) => message.name !== 'ChitChat'));
            createNetworkXGraph(messages).then((graph) => {
                getSurveyResults(id).then((surveyResults) => {
                    //make the survey results as dictthe the uid is key and the rest value
                    const surveyResultsDict = {};
                    surveyResults.forEach((result) => {
                        surveyResultsDict[result.user_id] = result;
                    });
                    for (let node of graph.nodes) {
                        node['opinion_pre'] = surveyResultsDict[node.id]
                            ? surveyResultsDict[node.id].opinion_pre
                            : '-';
                        node['opinion_post'] = surveyResultsDict[node.id]
                            ? surveyResultsDict[node.id].opinion_post
                            : '-';
                    }
                    let allNames = messages.map((obj) => obj.name);
                    allNames = allNames.filter((name) => name !== 'ChitChat');
                    const uniqueNames = [...new Set(allNames)];
                    setUsers(uniqueNames);
                    setGraph(graph);
                    setIsLoading(false);
                });
            });
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
                    {graph && viewDict[viewOptions]}
                </div>
            </div>
        </div>
    );
};

export default ExperimentMetric;
