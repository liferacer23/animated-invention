import React from "react";
import TagIcon from "../../public/assets/tagIcon.png";
import Image from "next/image";
import LineChart from "./components/lineChart";
import TableComponent from "./components/tableComponent";
export default function Home() {
  return (
    <main className="flex flex-col w-10/12 h-15 mx-auto items-center justify-between  bg-white mt-3 px-44">
      <div className="w-full flex flex-col items-end gap-2 my-2">
        <h1 className="text-[22px] font-semibold text-grayish">Overview</h1>
        <p className="text-[16px] cursor-pointer text-greenify">
          Explore broker insights
        </p>
      </div>
      <>
        <div className="w-full flex justify-end gap-10 my-5 ">
          <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
            <div className="flex justify-between items-start">
              <Image src={TagIcon} alt="tag icon" />
              <h1 className="text-[24px] font-bold text-grayish">Tel Aviv</h1>
            </div>
            <div className="flex flex-col items-end">
              <p>City's Monthly Broke Rise</p>
              <p>
                {" "}
                | <span className="text-greenify text-[14px] ">27</span> Brokers
                Added
              </p>
            </div>
          </div>
          <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
            <div className="flex justify-between items-start ">
              <Image src={TagIcon} alt="tag icon" />
              <h1 className="text-[24px] font-bold text-grayish">Tel Aviv</h1>
            </div>
            <div className="flex flex-col items-end">
              <p>City's Monthly Brokers</p>
            </div>
          </div>
          <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
            <div className="flex justify-between items-start">
              <Image src={TagIcon} alt="tag icon" />
              <h1 className="text-[24px] font-bold text-grayish">Tel Aviv</h1>
            </div>
            <div className="flex flex-col items-end justify-star">
              <p>Total Brokers in Israel</p>
              <p>
                {" "}
                | <span className="text-greenify text-[14px] ">2%</span> change
                from last month
              </p>
            </div>
          </div>
        </div>
      </>
      <div className="w-full flex justify-end gap-10 my-5 ">
        <LineChart />
      </div>
      <div className="w-full flex justify-end gap-10 my-5 ">
        <TableComponent />
      </div>
    </main>
  );
}
