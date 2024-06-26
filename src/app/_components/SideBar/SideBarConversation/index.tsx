"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ChatRow from "./ChatRow";

type Props = {
  callback?: () => void;
};

const SideBarConversation = ({ callback }: Props) => {
  const { data: session } = useSession();
  const { data: conversations } = useQuery<SideBarConversation[]>({
    queryKey: ["sideBarConversation", session?.user?.email],
  });

  if (!conversations) {
    return <div />;
  }

  return (
    <div className="-mr-2 flex-1 flex-col overflow-y-auto pr-2 transition-opacity duration-500">
      <div className="flex flex-col gap-2 pb-2 text-sm text-token-text-primary">
        {
          <ol>
            {conversations.map((conversation) => (
              <ChatRow
                callback={callback}
                key={conversation.id}
                id={conversation.id}
                displayMessage={conversation.messages[0].text}
              />
            ))}
          </ol>
        }
      </div>
    </div>
  );
};

export default SideBarConversation;
