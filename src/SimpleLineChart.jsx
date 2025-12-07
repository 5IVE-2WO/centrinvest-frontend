import { LineChart, Line, YAxis, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const SimpleLineChart = ({ data }) => (
    <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
    </LineChart>
);

export default SimpleLineChart;
