"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import SectionLoader from "@/components/SectionLoader";

interface Props {
    data: any;
    loading: boolean;
}

const DailyHeatmap = ({ data, loading }: Props) => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm w-full overflow-x-auto">
            {loading ? <SectionLoader /> : (
                <>
                    <div className="overflow-x-auto">
                        <div className="min-w-[1000px]">
                            <CalendarHeatmap
                                startDate={lastYear}
                                endDate={today}
                                showWeekdayLabels={true}
                                values={data}
                                classForValue={(value: any) => {
                                    if (!value || (value.subjects + value.documents + value.aiNotes) === 0) return "color-empty";
                                    if ((value.subjects + value.documents + value.aiNotes) <= 2) return "color-scale-1";
                                    if ((value.subjects + value.documents + value.aiNotes) <= 5) return "color-scale-2";
                                    return "color-scale-3";
                                }}
                                tooltipDataAttrs={(value: any) => {
                                    if (!value || !value.date) {
                                        return {
                                            "data-tooltip-id": "heatmap-tooltip",
                                            "data-tooltip-html": `<div>No activity</div>`,
                                        };
                                    }

                                    const subjects = value.subjects || 0;
                                    const documents = value.documents || 0;
                                    const aiNotes = value.aiNotes || 0;
                                    const total = subjects + documents + aiNotes;

                                    return {
                                        "data-tooltip-id": "heatmap-tooltip",
                                        "data-tooltip-html": `
                                        <div style="min-width:140px;">
                                            <div style="font-weight:600; font-size:13px; margin-bottom:6px;">
                                                ${value.date}
                                            </div>

                                            <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                                                <span style="">Subjects</span>
                                                <span style="font-weight:500;">${subjects}</span>
                                            </div>

                                            <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                                                <span style="">Documents</span>
                                                <span style="font-weight:500;">${documents}</span>
                                            </div>

                                            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                                                <span style="">AI Notes</span>
                                                <span style="font-weight:500;">${aiNotes}</span>
                                            </div>

                                            <div style="border-top:1px solid #e2e8f0; padding-top:6px; display:flex; justify-content:space-between;">
                                                <span style="font-weight:600;">Total</span>
                                                <span style="font-weight:600;">${total}</span>
                                            </div>
                                        </div>
                                    `,
                                    };
                                }}
                            />
                        </div>
                    </div>

                    <h2 className="text-lg text-center font-semibold">
                        Activity Heatmap
                    </h2>

                    <Tooltip
                        id="heatmap-tooltip"
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "12px",
                            fontSize: "12px",
                            padding: "10px 12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default DailyHeatmap;