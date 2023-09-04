import { InboxList } from "./InboxList";
import InboxContent from "./InboxContent";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";
import "./Home.css";
import { useQueryClient } from "react-query";
import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";
import getSocket from "../../utils/socket";
import { Socket } from "socket.io-client";

export default function Home() {
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser(["user"], auth);
  const [selectedInbox] = useAtom(selectedInboxAtom);

  useEffect(() => {
    let socket;
    if (user) {
      socket = getSocket(user?.email as string);
      console.log(socket);
      socket.on("new-message", (message) => {
        if (!selectedInbox) {
          queryClient.invalidateQueries({
            queryKey: ["api", "inbox_list_with_overview", user?.email],
          });
        } else {
          queryClient.setQueriesData(
            ["api", "messages", selectedInbox?.inboxId],
            (messages: any) => {
              return [...messages, message];
            }
          );
        }
      });
      socket.on("user-online", (userEmail) => {
        queryClient.setQueryData(
          ["api", "inbox_list_with_overview", user?.email],
          (inboxes: any) => {
            return inboxes.map((inbox: any) => {
              if (inbox.userEmail === userEmail) {
                return {
                  ...inbox,
                  status: true,
                };
              }
              return inbox;
            });
          }
        );
      });
      socket.on("user-offline", (userEmail) => {
        queryClient.setQueryData(
          ["api", "inbox_list_with_overview", user?.email],
          (inboxes: any) => {
            return inboxes.map((inbox: any) => {
              if (inbox.userEmail === userEmail) {
                return {
                  ...inbox,
                  status: false,
                };
              }
              return inbox;
            });
          }
        );
      });
    }
    return () => {
      socket && socket.disconnect();
    };
  });

  return (
    <HelmetProvider>
      <main className="content">
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
            crossOrigin="anonymous"
          ></script>
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
        </Helmet>
        <div className="container p-1 vh-100 d-flex flex-column">
          <h1 className="mb-3 h3">Messages</h1>
          <div className="card overflow-hidden flex-grow-1">
            <div className="d-flex g-0 flex-grow-1 overflow-hidden">
              <InboxList />
              <InboxContent />
            </div>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}
