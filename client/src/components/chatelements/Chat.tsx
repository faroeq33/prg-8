import { Message } from "@/types";

function getIcon(role: string) {
  switch (role) {
    case "human":
      return "👤";
    case "ai":
      return "🤖";
    case "system":
      return "🔊";
    default:
      return "🔊";
  }
}

type ChatProps = {
  messages: Message[];
  className?: string;
};

export function Chat(props: ChatProps) {
  if (!props.messages) return null;
  return (
    <>
      <div className={props.className}>
        <div className="bg-white rounded-md answer">
          <div>
            {props.messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`p-4 first:rounded-t-md odd:bg-gray-200 ${
                    message.role === "human" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="font-bold capitalize">
                    {getIcon(message.role)} {message.role}
                  </span>
                  : <span>{message.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
