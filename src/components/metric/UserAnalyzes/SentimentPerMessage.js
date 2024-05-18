import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Line,
    LineChart, Brush,ReferenceLine
} from 'recharts';

const SentimentPerMessage = ({ data }) => {
    return (
        <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis label={{ position: 'insideBottom' }} fontSize={10} />
            <YAxis
                domain={[-1, 1]}
                label={{
                    value: 'Sentiment',
                    angle: -90,
                    position: 'insideLeft',
                }}
                fontSize={10}
            />
            <Tooltip />
            <defs>
                <linearGradient
                    id="splitColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"></linearGradient>
            </defs>
            <Line
                type="monotone"
                dataKey="sentiment"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <ReferenceLine y={0} stroke="#000" />
            <Brush/>
        </LineChart>
    );
};

export default SentimentPerMessage;
