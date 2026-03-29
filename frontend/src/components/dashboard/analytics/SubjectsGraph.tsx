"use client";
import Loader from "@/components/Loader";
import SectionLoader from "@/components/SectionLoader";
import {
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: any,
    loading: boolean
}

export default function SubjectsGraph({ data, loading }: Props) {
    return (
        <div className="w-full max-w-[600px] h-[320px] bg-white rounded-2xl p-4 shadow-sm">
            {loading ? <SectionLoader /> : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 20, bottom: 30, left: 20 }}
                    >
                        {/* Grid */}
                        <CartesianGrid stroke="#292525" strokeDasharray="4 4" />

                        {/* X Axis */}
                        <XAxis
                            dataKey="date"
                            stroke="black"
                            tick={{ fill: "#475569", fontSize: 15 }}
                            label={{
                                value: "Weeks",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: "black", fontSize: 12 },
                            }}
                        />

                        {/* Y Axis */}
                        <YAxis
                            stroke="black"
                            tick={{ fill: "#475569", fontSize: 15 }}
                            label={{
                                value: "Subjects Created",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                    fill: "black",
                                    fontSize: 12,
                                },
                            }}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "black",
                                border: "1px solid #bfdbfe",
                                borderRadius: "10px",
                            }}
                            labelStyle={{
                                color: "white",
                                fontWeight: "600",
                            }}
                            itemStyle={{
                                color: "white",
                                fontSize: "13px",
                            }}
                        />

                        {/* Line */}
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="black"
                            strokeWidth={2}
                            dot={{ r: 4, fill: "white" }}
                            activeDot={{ r: 6 }}
                            name="Subjects Created"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}