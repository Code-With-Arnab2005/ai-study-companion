const StatCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <div
      className="
        bg-white rounded-2xl border p-6 shadow-sm
        cursor-pointer
        transform transition-all duration-300 ease-out
        hover:scale-[1.03]
        hover:shadow-md
      "
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;