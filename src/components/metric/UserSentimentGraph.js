import React, {PureComponent, useEffect, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, Legend ,CartesianGrid, Tooltip, BarChart, Bar, Rectangle} from 'recharts';
import { getMessagesByCollectionId } from "../../requests/FireBase"




const UserSentimentGraph =  ({id}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [users, setUsers] = useState([]);
    const [barData, setBarData] = useState([]);
    const [averageData, setAverageData] = useState([]);

    const tempData = [
        { name: 'Positive', value: 10 },
        { name: 'Negative', value: 1 },
        { name: 'Natural', value: 0 }
    ];

    useEffect(() => {
        getMessagesByCollectionId(id).then(messages => {
            setData(messages);
            //console.log(messages);
            let allNames = messages.map(obj => obj.name);
            allNames = allNames.filter(name => name !== "ChitChat");
            const uniqueNames = [...new Set(allNames)];
            setUsers(uniqueNames);
        })

    }, [id]);


    const filterMessagesByName = ( userName ) => {
        const filteredData = data.filter(item => item.name === userName);
        sentimentSumAndAverage(filteredData);
        sentimentDivision(filteredData);
    }
    const sentimentDivision = (filteredData) => {
        let positiveCount = 0;
        let negativeCount = 0;
        let naturalCount = 0;

        filteredData.forEach(message => {
            if(message.sentimentScore < -0.2) {
                negativeCount += 1;
            } else if(message.sentimentScore > 0.2) {
                positiveCount += 1;
            } else {
                naturalCount += 1;
            }
        })
        setBarData([
            { name: 'Positive', value: positiveCount },
            { name: 'Negative', value: negativeCount },
            { name: 'Natural', value: naturalCount }
        ]);
    }

    const sentimentSumAndAverage = (filteredData) => {
        let tempData = [];
        let tempAverageData = [];
        let totalSentimentScore = 0;
        let averageScore = filteredData[0].sentimentScore;
        filteredData.forEach(message => {
            totalSentimentScore += message.sentimentScore
            totalSentimentScore = parseFloat(totalSentimentScore.toFixed(2));
            averageScore = ((averageScore + message.sentimentScore) / 2);
            averageScore = parseFloat(averageScore.toFixed(2));
            const milliseconds = message.createdAt.seconds * 1000 + Math.round(message.createdAt.nanoseconds / 1000000);
            const date = new Date(milliseconds);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            tempData.push({
                // name: formattedTime,
                sentiment: totalSentimentScore
            });
            tempAverageData.push( {
                sentiment: averageScore
            })
        })
        console.log("average" + JSON.stringify(tempAverageData));
        setFilteredData(tempData);
        setAverageData(tempAverageData);
    }

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
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return(
        <div>
            <select
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Select a name</option>
                {users.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="flex">
                <div>
                    <AreaChart
                        width={500}
                        height={400}
                        data={filteredData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis label={{ value: 'Time', position: 'insideBottom' }} dataKey="name"/>
                        <YAxis label={{ value: 'Sentiment', angle: -90, position: 'insideLeft' }} />
                        <Tooltip/>
                        <defs>
                            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset={off} stopColor="green" stopOpacity={1}/>
                                <stop offset={off} stopColor="red" stopOpacity={1}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="sentiment" stroke="#000" fill="url(#splitColor)"/>
                    </AreaChart>
                </div>

                <AreaChart
                    width={500}
                    height={400}
                    data={averageData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis label={{ value: 'Time', position: 'insideBottom' }} dataKey="name"/>
                    <YAxis label={{ value: 'Sentiment', angle: -90, position: 'insideLeft' }} />
                    <Tooltip/>
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="green" stopOpacity={1}/>
                            <stop offset={off} stopColor="red" stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sentiment" stroke="#000" fill="url(#splitColor)"/>
                </AreaChart>
                <div>
                    <BarChart
                        width={500}
                        height={400}
                        data={barData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle stroke="blue" />} />
                    </BarChart>
                </div>

            </div>
        </div>

    );
}


export default UserSentimentGraph;
