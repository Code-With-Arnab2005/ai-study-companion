"use client";
import Loader from "@/components/Loader";
import SectionLoader from "@/components/SectionLoader";
import { useTheme } from "next-themes";
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

export const getChartColors = (isDark: boolean) => {
    return {
        grid: isDark ? "white" : "black",
        axis: isDark ? "white" : "black",

        tooltipBg: isDark ? "black" : "white",
        tooltipBorder: isDark ? "white" : "black",
        tooltipText: isDark ? "white" : "black",

        line: isDark ? "white" : "black",
    }
}

export default function SubjectsGraph({ data, loading }: Props) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark"
    const colors = getChartColors(isDark)

    return (
        <div className={`w-full max-w-[600px] h-[320px] bg-card rounded-2xl p-4 shadow-sm`}>
            {loading ? <SectionLoader /> : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 20, bottom: 30, left: 20 }}
                    >
                        {/* Grid */}
                        <CartesianGrid stroke={resolvedTheme === "dark" ? "white" : "black"} strokeDasharray="4 4" />

                        {/* X Axis */}
                        <XAxis
                            dataKey="date"
                            interval={0}
                            stroke={colors.axis}
                            tick={{ fill: colors.axis, fontSize: 15 }}
                            tickFormatter={(value) => {
                                const [day, month] = value.split("/"); // "23/3/2026"
                                return `${day}/${month}`;             // "23/3"
                            }}
                            label={{
                                value: "Date",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: colors.axis, fontSize: 12 },
                            }}
                        />

                        {/* Y Axis */}
                        <YAxis
                            stroke={colors.axis}
                            tick={{ fill: colors.axis, fontSize: 15 }}
                            label={{
                                value: "Subjects Created",
                                angle: -90,
                                position: "insideLeft",
                                style: {
                                    textAnchor: "middle",
                                    fill: resolvedTheme === "dark" ? "white" : "black",
                                    fontSize: 12,
                                },
                            }}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: colors.tooltipBg,
                                border: `1px solid ${colors.tooltipBorder}`,
                                borderRadius: "10px",
                            }}
                            labelStyle={{
                                color: colors.tooltipText,
                                fontWeight: "600",
                            }}
                            itemStyle={{
                                color: colors.tooltipText,
                                fontSize: "13px",
                            }}
                        />

                        {/* Line */}
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke={colors.line}
                            strokeWidth={2}
                            dot={{ r: 4, fill: colors.line }}
                            activeDot={{ r: 6 }}
                            name="Subjects Created"
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}