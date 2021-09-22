import  { FC } from "react";

interface TablePropsInterface {
  tableHead: string[];
  tableData: any[];
  tableDataFields: any[];
  slotProp?: any;
  deleteItem?: boolean;
  editItem?: boolean;
  rowClass?: string;
  onRowClick?: any;
  onDelete?: any;
}

const Table: FC<TablePropsInterface> = ({
  tableHead,
  tableData,
  tableDataFields,
  slotProp,
  deleteItem,
  editItem,
  rowClass,
  onRowClick,
  onDelete,
  children,
}) => {
  

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto ">
        <div className="pb-2 pt-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border border-gray-500 sm:rounded-lg bg-gray-50 ">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-50">
                <tr>
                  {tableHead.map((headItem) => {
                    return (
                      <th
                        scope="col"
						key={headItem}
                        className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {headItem}
                      </th>
                    );
                  })}

                  {editItem && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Izmeni
                    </th>
                  )}

                  {deleteItem && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Obriši
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {tableData.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className="rowClass"
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      {tableDataFields.map((item) => {
                        return (
                          <td key={item.value} className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={
                                "text-sm font-medium text-gray-900 " +
                                item.className
                              }
                            >
                              <span v-if="item.iconClass">
                                <i className={item.iconClass}></i>
                              </span>
                              {item.parser
                                ? item.parser(row[item.value])
                                : row[item.value]}
                            </div>
                          </td>
                        );
                      })}
                      {slotProp && (
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex items-center text-gray-900">
                            {children}
                          </div>
                        </td>
                      )}

                      {editItem && (
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="flex justify-center items-center text-gray-900">
                            <i className="fas fa-edit text-green-600 cursor-pointer transition duration-500 ease-in-out hover:text-green-800 transform hover:scale-125"></i>
                          </div>
                        </td>
                      )}
                      {deleteItem && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-center items-center text-gray-900" onClick={() => {
							  onDelete(row.id)
						  } }>
                            <i className="fas fa-trash-alt text-red-600 cursor-pointer transition duration-500 ease-in-out hover:text-red-800 transform hover:scale-125"></i>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
