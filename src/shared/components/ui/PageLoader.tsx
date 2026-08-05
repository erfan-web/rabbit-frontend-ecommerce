import TopLoader from "@/shared/components/ui/TopLoader";

const PageLoader = () => {
  return (
    <>
      <TopLoader />
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    </>
  );
};

export default PageLoader;
