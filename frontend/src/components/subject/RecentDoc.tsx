const RecentDoc = ({ doc_type, name }: { doc_type: string, name: string }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-card-secondary transform transition-all border-2 duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
      <div className="flex justidy-center items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-image-bg flex items-center justify-center text-image-text font-bold">
          {doc_type}
        </div>
        <p className="text-sm text-card-foreground truncate">{name}</p>
      </div>
    </div>
  );
};
export default RecentDoc;