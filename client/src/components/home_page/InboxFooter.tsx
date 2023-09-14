import { useAtom } from "jotai";
import { messageAtom } from "../../jotai_atoms";
import { useMutation } from "react-query";
import {
  sendMessage,
  createInbox,
} from "../../controllers/query_controllers/inboxController";
import { selectedInboxAtom } from "../../jotai_atoms";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";
import { useQueryClient } from "react-query";
import {
  searchTermAtom,
  isSearchListAtom,
  searchNonConnectedUsersAtom,
} from "../../jotai_atoms";
import socket from "../../utils/socket";

let tt: any = false;

export function InboxFooter() {
  const { data: user } = useAuthUser(["user"], auth);
  const queryClient = useQueryClient();
  const [message, setMessage] = useAtom(messageAtom);
  const [selectedInbox, setSelectedInbox] = useAtom(selectedInboxAtom);
  const [searchTerm] = useAtom(searchTermAtom);
  const [, setIsSearchList] = useAtom(isSearchListAtom);
  const [, setSearchNonConnectedUsers] = useAtom(searchNonConnectedUsersAtom);
  const messagesMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: (message) => {
      queryClient.setQueryData(
        [
          "api",
          "messages",
          selectedInbox && "inboxId" in selectedInbox && selectedInbox?.inboxId,
        ],
        (messages: any) => {
          if (messages) {
            return [...messages, message];
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "api",
        "inbox_list_with_overview",
        user?.email,
      ]);
    },
  });
  const inboxListMutation = useMutation({
    mutationFn: createInbox,
    onSuccess: (data) => {
      // console.log(data);
      setSelectedInbox(data);
    },
  });

  const handleMessageChange = (event: any) => {
    if (event.key === "Enter") {
      if (!event.getModifierState("Shift")) {
        event.preventDefault();
        return handleSend();
      }
    }
    setMessage(event.target.value);
    if (event.target.value) {
      if (tt) {
        clearTimeout(tt);
        tt = setTimeout(() => {
          socket.emit(
            "user-not-typing",
            selectedInbox &&
              "inboxId" in selectedInbox &&
              selectedInbox.inboxId,
            user?.email
          );
          tt = false;
        }, 1000);
      } else {
        socket.emit(
          "user-typing",
          selectedInbox && "inboxId" in selectedInbox && selectedInbox.inboxId,
          user?.email
        );
        tt = setTimeout(() => {
          socket.emit(
            "user-not-typing",
            selectedInbox &&
              "inboxId" in selectedInbox &&
              selectedInbox.inboxId,
            user?.email
          );
          tt = false;
        }, 1000);
      }
    } else {
      if (tt) {
        clearTimeout(tt);
        tt = false;
      }
      socket.emit(
        "user-not-typing",
        selectedInbox && "inboxId" in selectedInbox && selectedInbox.inboxId,
        user?.email
      );
    }
  };

  const handleSend = async () => {
    if (
      selectedInbox &&
      "inboxId" in selectedInbox &&
      selectedInbox?.inboxId &&
      user?.email &&
      message !== ""
    ) {
      messagesMutation.mutate({
        _id: selectedInbox?.inboxId,
        sender: user?.email,
        message: message,
        data: Date.now(),
      });
      // console.log(Date.now());
      setMessage("");
    } else if (user?.email && message !== "") {
      const inbox = await inboxListMutation.mutateAsync({
        sender: user?.email as string,
        receiver: selectedInbox?.userEmail as string,
        receiverDisplayName: selectedInbox?.userDisplayName as string,
      });
      setSelectedInbox(inbox);
      await messagesMutation.mutateAsync({
        _id: inbox.inboxId,
        sender: user?.email,
        message: message,
        data: Date.now().toString(),
      });
      queryClient.invalidateQueries({
        queryKey: ["api", "messages", inbox.inboxId],
      });
      setMessage("");
      if (searchTerm?.value) {
        searchTerm.value = "";
      }
      setIsSearchList(false);
      setSearchNonConnectedUsers(false);
      queryClient.invalidateQueries([
        "api",
        "inbox_list_with_overview",
        user?.email,
      ]);
    }
  };
  return (
    <div className="flex-grow-0 py-2 px-md-4 py-md-3 border-top">
      <div className="input-group">
        <textarea
          className="form-control "
          style={{
            resize: "none",
            borderRadius: "5px 0 0 5px",
          }}
          placeholder="Type your message"
          value={message}
          onChange={handleMessageChange}
          tabIndex={0}
          onKeyDown={handleMessageChange}
          rows={1}
        />
        <button
          className="btn btn-primary"
          tabIndex={0}
          onClick={handleSend}
          style={{
            borderRadius: "0 5px 5px 0",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
