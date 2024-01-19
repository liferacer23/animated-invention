"use client";
import React, { useEffect, useState } from "react";
import TagIcon from "../../public/assets/tagIcon.png";
import Image from "next/image";
import LineChart from "./components/lineChart";
import TableComponent from "./components/tableComponent";
import axios from "axios";
import moment from "moment";
import Skeleton from "./skeleton";
export default function Home() {
  interface Broker {
    _id: any;
    id: String;
    name: String;
    identification: Number;
    license: Number;
    homeTown: String;
    status: String;
    createdAt: String;
    updatedAt: String;
    "מס רשיון": Number;
    "שם המתווך": Number;
    "עיר מגורים": String;
  }
  const [brokersData, setBrokersData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const createBrokersRequest = async (brokers: any) => {
    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brokers),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getBrokers = async () => {
    try {
      const firstResponse = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=a0f56034-88db-4132-8803-854bcdb01ca1&limit=1"
      );
      const total = firstResponse?.data?.result?.total;

      const secondResponse = await axios.get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=a0f56034-88db-4132-8803-854bcdb01ca1&limit=${total}`
      );
      const newRecords = secondResponse.data.result.records.map(
        (broker: any) => ({
          id: broker._id,
          name: broker.name,
          license: broker["מס רשיון"],
          homeTown: broker["עיר מגורים"],
          status: broker.status,
          createdAt: moment().format("YYYY-MM-DD"),
          updatedAt: moment().format("YYYY-MM-DD"),
          identification: broker["מס רשיון"],
        })
      );
      createBrokersRequest(newRecords);
      setBrokersData((prevData: any) => {
        if (Array.isArray(prevData)) {
          return [...prevData, ...newRecords];
        } else {
          return newRecords;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function filterDuplicateObjects(arr: Broker[], prop: any) {
    const seen = new Set();
    return arr.filter((item: Broker) => {
      const value = item[prop as keyof Broker];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  const getBrokersRequest = async () => {
    try {
      const response = await fetch("/api/route", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data, "Brokeeeee");
      if (
        data?.brokers?.length > 0 &&
        data?.brokers[0]?.createdAt &&
        moment(data?.brokers[data?.brokers?.length - 1]?.createdAt)
          .startOf("month")
          .format("YYYY-MM-DD") !==
          moment().startOf("month").format("YYYY-MM-DD")
      ) {
        await getBrokers();
      } else {
        return setBrokersData(filterDuplicateObjects(data?.brokers, "license"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBrokersRequest().then(() => setLoading(false));
  }, []);

  console.log(brokersData, "brokersData");

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
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
                  <h1 className="text-[24px] font-bold text-grayish">
                    Tel Aviv
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <p>City&apos;s Monthly Broke Rise</p>
                  <p>
                    {" "}
                    | <span className="text-greenify text-[14px] ">
                      27
                    </span>{" "}
                    Brokers Added
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
                <div className="flex justify-between items-start ">
                  <Image src={TagIcon} alt="tag icon" />
                  <h1 className="text-[24px] font-bold text-grayish">
                    Tel Aviv
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <p>City&apos;s Monthly Brokers</p>
                </div>
              </div>
              <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
                <div className="flex justify-between items-start">
                  <Image src={TagIcon} alt="tag icon" />
                  <h1 className="text-[24px] font-bold text-grayish">
                    Tel Aviv
                  </h1>
                </div>
                <div className="flex flex-col items-end justify-star">
                  <p>Total Brokers in Israel</p>
                  <p>
                    {" "}
                    | <span className="text-greenify text-[14px] ">
                      2%
                    </span>{" "}
                    change from last month
                  </p>
                </div>
              </div>
            </div>
          </>
          <div className="w-full flex justify-end gap-10 my-5 ">
            {/* <LineChart /> */}
          </div>
          <div className="w-full flex justify-end gap-10 my-5 ">
            <TableComponent />
          </div>
        </main>
      )}
    </>
  );
}
