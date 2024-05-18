import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Brush,
} from 'recharts';
import { useEffect, useState } from 'react';

const UserMessages = ({ data }) => {
    const [allMessages, setAllMessages] = useState([]);
    useEffect(() => {
        let allMessagesData = [];
        data.forEach((message) => {
            const milli =
                message.createdAt.seconds * 1000 +
                Math.round(message.createdAt.nanoseconds / 1000000);
            const date = new Date(milli);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            allMessagesData.push({
                name: message.name,
                time: formattedTime,
                sentiment: message.sentimentScore,
                text: message.text,
            });
        });
        setAllMessages(allMessagesData);
    }, []);
    const CustomizedDot = (props) => {
        const { cx, cy, stroke, payload, sentiment } = props;

        if (sentiment > 0.2) {
            return (
                <svg
                    x={cx - 10}
                    y={cy - 10}
                    width={20}
                    height={20}
                    fill="green"
                    viewBox="0 0 24 24">
                    <path d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
                </svg>
            );
        } else if (sentiment < -0.2) {
            return (
                <svg
                    x={cx - 10}
                    y={cy - 10}
                    width={20}
                    height={20}
                    fill="red"
                    viewBox="0 0 24 24">
                    <path d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
                </svg>
            );
        }

        return (
            <svg
                x={cx - 10}
                y={cy - 10}
                width={20}
                height={20}
                fill="grey"
                viewBox="0 0 24 24">
                <path d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" />
            </svg>
        );
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded bg-gray-200 p-2">
                    <p className="label">{`name: ${payload[0].payload.name}`}</p>
                    <p className="intro">{`sentiment: ${payload[0].payload.sentiment}`}</p>
                    <p className="desc">{`${payload[0].payload.time}: ${payload[0].payload.text}`}</p>
                </div>
            );
        }

        return null;
    };
    return (
        allMessages && (
            <ScatterChart
                width={900}
                height={800}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
                data={allMessages}>
                <CartesianGrid vertical={false} />
                <XAxis />
                <YAxis
                    type="category"
                    dataKey="name"
                    allowDuplicatedCategory={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter fill="#8884d8" shape={<CustomizedDot />} />
                <Brush />
            </ScatterChart>
        )
    );
};

export default UserMessages;
