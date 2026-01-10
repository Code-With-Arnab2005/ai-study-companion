"use client";
import RecentDoc from "@/components/subject/RecentDoc";
import RecentSubjectCard from "@/components/subject/RecentSubjectCard";
import StatCard from "@/components/subject/StatCard";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100">
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Overview of your study workspace
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Subjects" value="6" />
          <StatCard title="Total Documents" value="24" />
          <StatCard title="PDF Notes" value="15" />
          <StatCard title="AI Sessions" value="12" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Subjects */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recently Created Subjects
            </h2>

            <div className="space-y-4">
              <RecentSubjectCard name="Operating Systems" docs={5} />
              <RecentSubjectCard name="DBMS" docs={3} />
              <RecentSubjectCard name="Computer Networks" docs={7} />
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Notes / PDFs
            </h2>

            <div className="space-y-3">
              <RecentDoc name="OS - Process Scheduling.pdf" />
              <RecentDoc name="DBMS Normal Forms.pdf" />
              <RecentDoc name="CN - TCP vs UDP.pdf" />
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default DashboardPage;