import React from "react";

const LoadingSkeleton = () => {
  return (
    <main className="flex flex-col w-4/12 h-15 mx-auto items-center justify-between bg-white mt-3 px-44">
      <div className="w-full flex flex-col items-end gap-2 my-2">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-6 w-36 rounded"></div>
          <div className="bg-gray-300 h-4 w-40 rounded"></div>
        </div>
      </div>
      <>
        <div className="w-full flex justify-end gap-10 my-5 ">
          <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-gray-200 gap-2 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="bg-gray-300 h-8 w-8 rounded"></div>
              <div className="bg-gray-300 h-6 w-32 rounded"></div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-gray-300 h-4 w-20 rounded"></div>
              <div className="bg-gray-300 h-4 w-36 rounded"></div>
            </div>
          </div>
          {/* Repeat similar structure for other items */}
        </div>
      </>
      <div className="w-full flex justify-end gap-10 my-5 ">
        {/* <LineChartSkeleton /> */}
      </div>
      <div className="w-full flex justify-end gap-10 my-5 "></div>
    </main>
  );
};

export default LoadingSkeleton;
