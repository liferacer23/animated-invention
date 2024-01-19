import React from "react";

const data = [
  { id: 1, name: "Item 1", value: 10 },
  { id: 2, name: "Item 2", value: 20 },
  { id: 3, name: "Item 3", value: 30 },
  { id: 4, name: "Item 4", value: 40 },
  { id: 5, name: "Item 5", value: 50 },
];
interface TableData {
  id: React.Key | null | undefined;
  city:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  brokers:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}
const Table = ({ tableData }: { tableData: TableData[] }) => {
  return (
    <div className="w-[32rem] h-[29rem] overflow-auto rounded mb-12 border-grayish">
      <table className="]bg-white border-solid border-2 rounded-2xl">
        <thead>
          <tr>
            <th className="px-6 py-3 text-right font-jakarta text-gray-500  bg-lightGray w-full  rounded text-[18px]">
              Total Brokers
            </th>
            <th className="px-6 py-3 text-right font-jakarta text-gray-500  bg-white text-[18px] border-x-2 border-grayish">
              Area
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-right">
          {tableData?.map(
            (item: {
              id: React.Key | null | undefined;
              city:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | React.PromiseLikeOfReactNode
                | null
                | undefined;
              brokers:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | React.PromiseLikeOfReactNode
                | null
                | undefined;
            }) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap bg-lightGray">
                  {item.brokers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-x-2 border-grayish rounded">
                  {item.city}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
