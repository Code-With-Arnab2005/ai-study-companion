"use client";
import SubjectsGraph from './analytics/SubjectsGraph';
import DocumentsGraph from './analytics/DocumentsGraph';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr/helper';
import DailyHeatmap from './analytics/DailyHeatmap';

const data1 = [
  { date: "24/1/2026", uv: 6 },
  { date: "25/1/2026", uv: 6 },
  { date: "26/1/2026", uv: 3 },
  { date: "27/1/2026", uv: 8 },
  { date: "1/2/2026", uv: 5 },
  { date: "2/2/2026", uv: 7 },
];

// #region Sample data
// const data2 = [
//     {
//         name: 'PDF',
//         uv: 25,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Notes',
//         uv: 19,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'DOCS',
//         uv: 7,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'IMAGES',
//         uv: 27,
//         pv: 3908,
//         amt: 2000,
//     }
// ];

// const fetcher = async (url: string) => await fetch(url).then(res => res)

const Analytics = () => {

  const { data: documentData, error: documentError, isLoading: documentLoading } = useSWR(
    "/get-documents-by-filtered-types",
    fetcher
  )
  const { data: subjectData, error: subjectError, isLoading: subjectLoading } = useSWR(
    "/get-last-seven-days-subject-filtered-by-date",
    fetcher
  )
  const { data: heatMapData, error: heatMapError, isLoading: heatmapLoading } = useSWR(
    "/get-daily-heatmap-data",
    fetcher
  )

  return (
    <div className='w-full flex flex-col gap-10'>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SubjectsGraph data={subjectData?.data ?? []} loading={subjectLoading} />
        <DocumentsGraph data={documentData?.data ?? []} loading={documentLoading} />
      </div>
      <div>
        <DailyHeatmap data={heatMapData?.data ?? []} loading={heatmapLoading} />
      </div>
    </div>
  )
}

export default Analytics
