import React from "react";

interface TableData {
  id: React.Key | null | undefined;
  city: string;

  brokers: string | number;
}
const Table = ({ tableData }: { tableData: TableData[] }) => {
  return (
    <div className="border-grayish border-2 h-fit mb-5 rounded-tr-xl rounded-br-xl">
      <div className="w-[32rem] h-[25rem] overflow-auto rounded-xl">
        <table className="bg-white border-solid  rounded-xl ">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-6 py-3 text-right font-jakarta text-gray-500  bg-lightGray w-full text-[18px] border-r-2 border-grayish rounded-tr-2">
                Total Brokers
              </th>
              <th className="px-6 py-3 text-right font-jakarta text-gray-500  bg-white text-[18px] border-l-2 border-grayish">
                Area
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-right">
            {tableData?.map(
              (item: {
                id: React.Key | null | undefined;
                city: string;

                brokers: string | number;
              }) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap bg-lightGray">
                    {item.brokers?.toLocaleString() ?? 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-l-2 border-grayish rounded">
                    {item.city}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
