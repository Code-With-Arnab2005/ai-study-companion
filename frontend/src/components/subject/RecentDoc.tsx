const RecentDoc = ({ doc_type, name }: { doc_type: string, name: string }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
      <div className="flex justidy-center items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          {doc_type}
        </div>
        <p className="text-sm text-gray-700 truncate">{name}</p>
      </div>
    </div>
  );
};
export default RecentDoc;