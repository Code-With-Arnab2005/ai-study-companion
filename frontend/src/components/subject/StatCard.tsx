"use client";
import SectionLoader from "../SectionLoader";

const StatCard = ({ title, value, isLoading }: { title: string; value: string, isLoading: any }) => {

  return (
    <div
      className={`bg-card text-foreground rounded-2xl border p-6 shadow-sm cursor-pointer transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md`}
    >
      {isLoading ? <SectionLoader /> : (
        <>
          <p className={`text-sm`}>{title}</p>
          <h3 className="text-3xl font-bold mt-2">
            {value}
          </h3>
        </>
      )}
    </div>
  );
};

export default StatCard;