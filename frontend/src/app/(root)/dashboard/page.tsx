import Analytics from "@/components/dashboard/Analytics";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentDocuments from "@/components/dashboard/RecentDocuments";
import RecentSubjects from "@/components/dashboard/RecentSubjects";
import StatusCard from "@/components/dashboard/StatusCard";
import PageWrapper from "@/components/PageWrapper";

const DashboardPage = () => {
  return (
    <PageWrapper>
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <StatusCard />

        {/* Analytics Graphs */}
        <Analytics />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Subjects */}
          <RecentSubjects />

          {/* Recent Documents */}
          <RecentDocuments />
        </div>
    </PageWrapper>
  );
};

export default DashboardPage;