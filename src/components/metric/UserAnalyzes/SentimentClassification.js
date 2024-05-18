import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Rectangle,
} from 'recharts';

const SentimentClassification = ({ data }) => {
    return (
        <BarChart
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
            <XAxis dataKey="name" fontSize={10} />
            <YAxis
                label={{
                    value: 'Num of Messages',
                    angle: -90,
                    position: 'insideLeft',
                }}
                fontSize={10}
            />
            <Tooltip />
            <Bar
                dataKey="value"
                fill="#8884d8"
                activeBar={<Rectangle stroke="blue" />}
            />
        </BarChart>
    );
};

export default SentimentClassification;
