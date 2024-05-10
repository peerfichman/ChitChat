import React, {PureComponent, useEffect, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMessagesByCollectionId } from "../../requests/FireBase"
import {getNeo4jGraph} from "../../requests/metric";

// const data = [
//     {
//         name: 'Page A',
//         sentiment: 4000,
//     },
//     {
//         name: 'Page B',
//         sentiment: 3000,
//     },
//     {
//         name: 'Page C',
//         sentiment: -1000,
//     },
//     {
//         name: 'Page D',
//         sentiment: 500,
//     },
//     {
//         name: 'Page E',
//         sentiment: -2000,
//     },
//     {
//         name: 'Page F',
//         sentiment: -250,
//     },
//     {
//         name: 'Page G',
//         sentiment: 3490,
//     },
// ];



const UserSentimentGraph =  ({id}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    console.log(id);
    useEffect(() => {
        getMessagesByCollectionId(id).then(messages => {
            setData(messages);
            console.log(data);
            filterMessagesByName("yovel gavrieli");
        })

    }, []);



    const filterMessagesByName = ( userName ) => {
        const filteredData = data.filter(item => item.name === userName);
        let tempData = [];
        filteredData.forEach(message => {
            tempData.push({
                name: message.createdAt,
                sentiment: message.sentimentScore
            });
        })
        console.log("filtered Data " + JSON.stringify(tempData) );
        setFilteredData(tempData);
    }
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

    return(<AreaChart
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="sentiment" stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
    );
}


export default UserSentimentGraph;
