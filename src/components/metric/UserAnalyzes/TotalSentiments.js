import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip, Brush,ReferenceLine
} from 'recharts';

const TotalSentiments = ({ gradientOffset, data }) => {
    return (
        <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                label={{ position: 'insideBottom' }}
                dataKey="name"
                fontSize={10}
            />
            <YAxis
                domain={[-5, 5]}
                label={{
                    value: 'Sentiment',
                    angle: -90,
                    position: 'insideLeft',
                }}
                fontSize={10}
            />
            <Tooltip />
            <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset={gradientOffset}
                        stopColor="green"
                        stopOpacity={1}
                    />
                    <stop
                        offset={gradientOffset}
                        stopColor="red"
                        stopOpacity={1}
                    />
                </linearGradient>
            </defs>
            <Area
                type="monotone"
                dataKey="sentiment"
                stroke="#000"
                fill="url(#splitColor)"
            />
            <ReferenceLine y={0} stroke="#000" />
            <Brush/>
        </AreaChart>
    );
};

export default TotalSentiments;
