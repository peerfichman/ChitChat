import React, { useState } from 'react';
import ChartBlock from './UserAnalyzes/ChartBlock';
import TotalSentiments from './UserAnalyzes/TotalSentiments';
import SentimentPerMessage from './UserAnalyzes/SentimentPerMessage';
import SentimentClassification from './UserAnalyzes/SentimentClassification';
import AverageSentiments from './UserAnalyzes/AverageSentiments';

const UserSentimentGraph = ({ data, users }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [sentimentScoreList, setSentimentScoreList] = useState([]);
    const [averageScore, setAverageScore] = useState([]);


    const filterMessagesByName = (userName) => {
        const filteredData = data.filter((item) => item.name === userName);
        sentimentSumAndAverage(filteredData);
        sentimentDivision(filteredData);
    };
    const sentimentDivision = (filteredData) => {
        let positiveCount = 0;
        let negativeCount = 0;
        let naturalCount = 0;

        filteredData.forEach((message) => {
            if (message.sentimentScore < -0.2) {
                negativeCount += 1;
            } else if (message.sentimentScore > 0.2) {
                positiveCount += 1;
            } else {
                naturalCount += 1;
            }
        });
        setBarData([
            { name: 'Positive', value: positiveCount },
            { name: 'Negative', value: negativeCount },
            { name: 'Natural', value: naturalCount },
        ]);
    };

    const sentimentSumAndAverage = (filteredData) => {
        let tempData = [];
        let sentimentScoreList = [];
        let averageScoreList = [];
        let totalSentimentScore = 0;
        let sentimentScore = 0;
        let averageScore = 0;
        let numberOfMessages = 0;
        filteredData.forEach((message) => {
            numberOfMessages += 1;
            totalSentimentScore += message.sentimentScore;
            totalSentimentScore = parseFloat(totalSentimentScore?.toFixed(2));
            sentimentScore = parseFloat(message.sentimentScore?.toFixed(2));
            averageScore = parseFloat(
                totalSentimentScore / numberOfMessages,
            ).toFixed(2);
            const milliseconds =
                message.createdAt.seconds * 1000 +
                Math.round(message.createdAt.nanoseconds / 1000000);
            const date = new Date(milliseconds);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            tempData.push({
                name: formattedTime,
                sentiment: totalSentimentScore,
            });
            sentimentScoreList.push({
                sentiment: sentimentScore,
            });
            averageScoreList.push({
                sentiment: averageScore,
            });
        });
        setFilteredData(tempData);
        setSentimentScoreList(sentimentScoreList);
        setAverageScore(averageScoreList);
    };

    const handleChange = (e) => {
        const selectedName = e.target.value;
        filterMessagesByName(selectedName);
    };

    const gradientOffset = () => {
        const dataMax = Math.max(...filteredData.map((i) => i.sentiment));
        const dataMin = Math.min(...filteredData.map((i) => i.sentiment));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className="flex w-full flex-col items-center gap-3">
            <select
                onChange={handleChange}
                className="block w-1/2 rounded-md border border-gray-300 p-2 text-sm  shadow-sm">
                <option value="">Select a name</option>
                {users.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="grid grid-cols-1 gap-2 2xl:grid-cols-2">
                <ChartBlock title="Total Sentiment" footer="Time">
                    <TotalSentiments data={filteredData} gradientOffset={off} />
                </ChartBlock>
                <ChartBlock title="Average Sentiment" footer="Time">
                    <AverageSentiments
                        data={averageScore}
                        gradientOffset={off}
                    />
                </ChartBlock>
                <ChartBlock title="Sentiment Per Message" footer="Time">
                    <SentimentPerMessage data={sentimentScoreList} />
                </ChartBlock>
                <ChartBlock title="Sentiment Classification" footer="Sentiment">
                    <SentimentClassification data={barData} />
                </ChartBlock>
            </div>
        </div>
    );
};

export default UserSentimentGraph;
