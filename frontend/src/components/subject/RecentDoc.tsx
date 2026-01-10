const RecentDoc = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
      <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
        PDF
      </div>
      <p className="text-sm text-gray-700 truncate">{name}</p>
    </div>
  );
};
export default RecentDoc;