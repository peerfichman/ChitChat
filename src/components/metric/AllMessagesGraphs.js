import React from 'react';
import ChartBlock from './UserAnalyzes/ChartBlock';
import UsersMessages from './UserAnalyzes/UsersMessages';


const AllMessagesGraphs = ({ data }) => {

    return (
        <div className="flex w-full flex-col items-center">
            <div>
                <ChartBlock title="Messages Sentiment" footer="Time">
                    <UsersMessages data={data} />
                </ChartBlock>
            </div>
        </div>
    );
};

export default AllMessagesGraphs;
