"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    BarShapeProps,
    LabelList,
    Label,
    LabelProps,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import SectionLoader from '@/components/SectionLoader';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'black'];

// #endregion
const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props: BarShapeProps) => {
    const { x, y, width, height, index } = props;

    const color = colors[index % colors.length];

    return (
        <path
            strokeWidth={props.isActive ? 5 : 0}
            d={getPath(Number(x), Number(y), Number(width), Number(height))}
            stroke={color}
            fill={color}
            style={{
                transition: 'stroke-width 0.3s ease-out',
            }}
        />
    );
};

const CustomColorLabel = (props: LabelProps) => {
    const fill = colors[(props.index ?? 0) % colors.length];
    return <Label {...props} fill={fill} />;
};

interface Props {
    data: any,
    loading: boolean
}

const getFormattedData = (data: any) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    count: data[key].length,
  }));
  return chartData;
}

export default function DocumentsGraph({ data, loading }: Props) {

    const chartData = getFormattedData(data);

    return (
        <div className='w-full max-w-[600px] h-[320px] bg-white rounded-2xl p-4 shadow-sm'>
            {loading ? <SectionLoader /> : (
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip cursor={{ fillOpacity: 0.5 }} />
                        <XAxis dataKey="name" />
                        <YAxis width="auto" />
                        <Bar dataKey="count" fill="#8884d8" shape={TriangleBar} activeBar>
                            <LabelList content={CustomColorLabel} position="top" />
                        </Bar>
                        <RechartsDevtools />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}