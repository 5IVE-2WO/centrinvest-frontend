import { Cell, Pie, PieChart } from "recharts";

const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#A855F7",
];

// #endregion
export default function PieChartt({ data }) {
    return (
        <PieChart
            style={{
                maxWidth: "400px",
                maxHeight: "70vh",
                aspectRatio: 1,
            }}
            responsive
        >
            <Pie
                data={data}
                dataKey="amount"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                fill="#82ca9d"
            >
                {data &&
                    data.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.category}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
            </Pie>
        </PieChart>
    );
}
