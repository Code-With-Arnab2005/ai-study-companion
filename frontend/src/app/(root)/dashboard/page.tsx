import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentDocuments from "@/components/dashboard/RecentDocuments";
import RecentSubjects from "@/components/dashboard/RecentSubjects";
import StatusCard from "@/components/dashboard/StatusCard";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 mt-15">
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <StatusCard />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Subjects */}
          <RecentSubjects />

          {/* Recent Documents */}
          <RecentDocuments />
        </div>

      </section>
    </main>
  );
};

export default DashboardPage;