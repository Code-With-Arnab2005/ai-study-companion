const RecentSubjectCard = ({
  name,
  docs,
}: {
  name: string;
  docs: number;
}) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-card-secondary border-2 transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
      <div>
        <h3 className="font-medium text-foreground">{name}</h3>
        <p className="text-sm text-gray-500">{docs} documents</p>
      </div>
      <span className="text-indigo-600 font-medium text-sm cursor-pointer">
        View →
      </span>
    </div>
  );
};
export default RecentSubjectCard;