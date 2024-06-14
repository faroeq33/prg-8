import { ApiResponse } from "@/types";

function MetaData(props: {
  metadata: ApiResponse["metadata"];
  className?: string;
}) {
  const stats = [
    {
      name: "Completion tokens",
      stat: props.metadata?.tokenUsage?.completionTokens || "...",
    },
    {
      name: "Prompt Tokens",
      stat: props.metadata?.tokenUsage?.promptTokens || "...",
    },
    {
      name: "Total Tokens",
      stat: props.metadata?.tokenUsage?.totalTokens || "...",
    },
  ];

  return (
    <>
      <div className={`flex flex-col ${props.className}`}>
        <h3 className="text-base font-semibold leading-6 text-center text-gray-900">
          Token usage
        </h3>
        <dl>
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 overflow-hidden rounded-lg shadow sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

export default MetaData;
