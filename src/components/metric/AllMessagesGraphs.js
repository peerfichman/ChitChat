import React from 'react';
import ChartBlock from './UserAnalyzes/ChartBlock';
import UsersMessages from './UserAnalyzes/UsersMessages';
import DownloadCSVButton from './DownloadCSVButton';

const AllMessagesGraphs = ({ data }) => {
    console.log(data);
    return (
        <div className="flex w-full flex-col items-center">
            <div>
                <ChartBlock title="Messages Sentiment" footer="Time">
                    <UsersMessages data={data} />
                </ChartBlock>
                <div className="flex w-full justify-end pr-2 pt-2">
                    <DownloadCSVButton
                        data={data.map((row) => {
                            return [
                                row.name,
                                row.sentimentScore,
                                row.text,
                                new Date(
                                    row.createdAt.toDate().toISOString(),
                                ).toLocaleString(),
                            ];
                        })}
                        headers={['Name', 'Sentiment', 'Text', 'Time']}
                        filename={'Chat-History'}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllMessagesGraphs;
