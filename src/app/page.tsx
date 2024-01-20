"use client";
import React, { useEffect, useState } from "react";
import TagIcon from "../../public/assets/tagIcon.png";
import Image from "next/image";
import LineChart from "./components/lineChart";
import TableComponent from "./components/tableComponent";
import axios from "axios";
import moment from "moment";
import Skeleton from "./skeleton";

type BrokerByCity = {
  _id: string;
  count: number;
  latestEntry: string;
};

type BrokerStats = {
  brokersCount: number;
  brokersByCity: BrokerByCity[];
  latestEntry?: string;
  groupBrokersByCreatedAt: {
    _id: string;
    count: number;
  }[];
};

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
  const [brokersData, setBrokersData] = useState<BrokerStats>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<BrokerByCity>();
  const [chartData, setChartData] = useState<any>(null);
  const [currentMonthBrokers, setCurrentMonthBrokers] = useState<any>(null);

  const createBrokersRequest = async (brokers: any) => {
    try {
      const response = await fetch(`/api/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brokers),
      });
      const data = await response.json();
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

  const getMonthlyBrokers = async () => {
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
      setCurrentMonthBrokers(newRecords);
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

  const getBrokersFromDb = async () => {
    try {
      const response = await fetch(`/api/route`, {
        method: "GET",
      });
      const data = (await response.json()) as BrokerStats;
      console.log(data);

      if (
        data.brokersCount > 0 &&
        data.latestEntry &&
        moment(data.latestEntry).startOf("month").format("YYYY-MM-DD") !==
          moment().startOf("month").format("YYYY-MM-DD")
      ) {
        await getBrokers();
      } else {
        return setBrokersData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getMonthlyBrokers();
  }, []);

  useEffect(() => {
    setLoading(true);
    getBrokersFromDb().then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-end w-full mx-auto h-full">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <main className="flex flex-col w-full mx-auto items-center justify-between bg-white mt-3 px-4 md:w-10/12 md:px-44">
          <div className="w-full flex flex-col items-end gap-2 my-2">
            <h1 className="text-[22px] font-semibold text-grayish">Overview</h1>
            <p className="text-[16px] cursor-pointer text-greenify">
              Explore broker insights
            </p>
          </div>
          <>
            <div className="w-full flex flex-col items-center gap-5 my-5 md:flex-row md:justify-between">
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
                    |{" "}
                    <span className="text-greenify text-[14px] font-bold ">
                      {currentMonthBrokers?.length -
                        (brokersData?.brokersCount ?? 0) >
                      0
                        ? currentMonthBrokers?.length -
                          (brokersData?.brokersCount ?? 0)
                        : currentMonthBrokers?.length -
                            (brokersData?.brokersCount ?? 0) <
                          0
                        ? currentMonthBrokers?.length -
                          (brokersData?.brokersCount ?? 0) * 1
                        : 0}
                    </span>{" "}
                    Brokers Added
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
                <div className="flex justify-between items-start ">
                  <Image src={TagIcon} alt="tag icon" />
                  <h1 className="text-[24px] font-bold text-grayish">
                    {brokersData?.brokersByCity[0]._id ?? "N/A"}
                  </h1>
                </div>
                <div className="flex flex-col items-end">
                  <p>City with the most brokers</p>
                </div>
              </div>
              <div className="flex flex-col items-between w-[231px] h-[121px] shadow-smx bg-white gap-2">
                <div className="flex justify-between items-start">
                  <Image src={TagIcon} alt="tag icon" />
                  <h1 className="text-[24px] font-bold text-grayish">
                    {(brokersData?.brokersCount ?? 0) ===
                    currentMonthBrokers?.length
                      ? (brokersData?.brokersCount ?? 0).toLocaleString()
                      : Math.max(
                          currentMonthBrokers?.length -
                            (brokersData?.brokersCount ?? 0) +
                            (brokersData?.brokersCount ?? 0),
                          0
                        ).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col items-end justify-star">
                  <p>Total Brokers in Israel</p>
                  <p>
                    {" "}
                    |{" "}
                    <span className="text-greenify text-[14px] font-bold">
                      {(brokersData?.brokersCount ?? 0) ===
                      currentMonthBrokers?.length
                        ? "0%"
                        : `${(
                            ((currentMonthBrokers?.length -
                              (brokersData?.brokersCount ?? 0)) /
                              (brokersData?.brokersCount ?? 0)) *
                            100
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}%`}
                    </span>{" "}
                    change from last month
                  </p>
                </div>
              </div>
            </div>
          </>
          <div className="w-full flex justify-end gap-10 my-5 ">
            <LineChart
              chartData={
                brokersData?.groupBrokersByCreatedAt
                  ?.map((item: any) => ({
                    createdAt: item._id,
                    activeBrokers: item.count,
                  }))
                  .sort(
                    (a: any, b: any) => b.activeBrokers - a.activeBrokers
                  ) ?? []
              }
            />
          </div>
          <div className="w-full flex justify-end gap-10 my-5 ">
            <TableComponent
              tableData={
                brokersData?.brokersByCity?.map((item: any) => ({
                  id: item._id,
                  city: item._id,
                  brokers: item.count,
                })) ?? []
              }
            />
          </div>
        </main>
      )}
    </>
  );
}
