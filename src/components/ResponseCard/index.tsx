interface ResponseProps {
  entityKey: Array<string> | null,
  entityValue: Array<string> | null,
  headerA: string,
  headerB: string
}

export const ResponseCard = ({ entityKey, entityValue, headerA, headerB }: ResponseProps) => {
  // console.log('my ussd', entityKey, entityValue)
  return (

    <div className="rounded-md border bg-gray-50 shadow-lg max-h-96 overflow-auto">
      {/* Header Section */}
      {/* <div className="mb-4">
          <p className="text-lg font-bold text-gray-700 text-center">
            Church - {" "}
            <span className="text-blue-600">{"sdfdsfsd"}</span>
          </p>
        </div> */}

      {/* Branches Section */}
      {/* <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
          List of Branches
        </h3> */}

      {/* Table */}
      <div className="overflow-x-auto mx-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900">
            <tr>
              <th className="px-6 py-2 text-justify text-sm font-medium text-white uppercase tracking-wider whitespace-nowrap">
                {headerA}
              </th>
              <th className="px-6 py-2 text-justify text-sm font-medium text-white uppercase tracking-wider whitespace-nowrap">
                {headerB}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entityKey && entityKey.map((val, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 font-semibold  text-left py-4 whitespace-normal text-md text-gray-500 capitalize">
                  {val}
                </td>
                <td className="py-4 text-sm text-gray-500 text-left " style={{ wordBreak:'break-word' }}>

                  <span style={{ wordBreak:'break-word' }} className="bg-blue-100 text-dark-500 text-base font-normal  p-1 py-0.5 rounded
                  whitespace-normal capitalize">
                    {entityValue && entityValue[index]}
                  </span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}
