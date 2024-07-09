const LoadingPlaceholder: React.FC = () => {
  return (
    <div className="mt-2 animate-pulse p-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          className={`h-6 rounded bg-gray-200 ${index % 2 === 1 ? "mb-6 w-full " : "mb-2 w-20"}`}
          key={index}
          role="status"
        ></div>
      ))}
    </div>
  );
};

export default LoadingPlaceholder;
