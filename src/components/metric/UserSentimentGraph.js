import React, {PureComponent, useEffect, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMessagesByCollectionId } from "../../requests/FireBase"




const UserSentimentGraph =  ({id}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getMessagesByCollectionId(id).then(messages => {
            setData(messages);
            let allNames = messages.map(obj => obj.name);
            allNames = allNames.filter(name => name !== "ChitChat");
            const uniqueNames = [...new Set(allNames)];
            setUsers(uniqueNames);
        })

    }, [id]);


    const filterMessagesByName = ( userName ) => {
        const filteredData = data.filter(item => item.name === userName);
        let tempData = [];
        let totalSentimentScore = 0;
        filteredData.forEach(message => {
            totalSentimentScore += message.sentimentScore
            totalSentimentScore = parseFloat(totalSentimentScore.toFixed(2));
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
        })
        setFilteredData(tempData);
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

    );
}


export default UserSentimentGraph;
