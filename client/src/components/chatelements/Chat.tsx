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
        <div className="rounded-md paperbg answer">
          <div>
            {props.messages.map((message, index) => {
              const messageRole = message[0];
              const messageContent = message[1];

              return (
                <div
                  key={index}
                  className={`p-4 first:rounded-t-md odd:bg-gray-200 ${
                    message[0] === "human" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="font-bold capitalize">
                    {getIcon(messageRole)} {messageRole}
                  </span>
                  : <span>{messageContent}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
