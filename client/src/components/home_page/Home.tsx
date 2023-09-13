import { InboxList } from "./InboxList";
import InboxContent from "./InboxContent";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";
import "./Home.css";
import { useQueryClient } from "react-query";
import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";
import socket from "../../utils/socket";

import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import { useAuthSignOut } from "@react-query-firebase/auth";

export default function Home() {
  const signOutMutation = useAuthSignOut(auth);
  const queryClient = useQueryClient();
  const { data: user } = useAuthUser(["user"], auth);
  const [selectedInbox, setSelectedInbox] = useAtom(selectedInboxAtom);

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (socket && user) {
      socket.auth = { email: user.email };
      socket.connect();
      socket.on("new-message", (message) => {
        if (selectedInbox && "inboxId" in selectedInbox) {
          queryClient.setQueriesData(
            ["api", "messages", selectedInbox.inboxId],
            (messages: any) => {
              return [...messages, message];
            }
          );
        } else {
          queryClient.invalidateQueries({
            queryKey: ["api", "inbox_list_with_overview", user?.email],
          });
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
      socket.on("user-typing", (inboxId) => {
        if (
          selectedInbox &&
          "inboxId" in selectedInbox &&
          selectedInbox?.inboxId === inboxId
        ) {
          queryClient.setQueryData(
            ["api", "inbox_list_with_overview", user?.email],
            (inboxes: any) => {
              return inboxes.map((inbox: any) => {
                if (inbox.inboxId === inboxId) {
                  return {
                    ...inbox,
                    status: "typing",
                  };
                }
                return inbox;
              });
            }
          );
        }
      });
      socket.on("user-not-typing", (inboxId) => {
        if (
          selectedInbox &&
          "inboxId" in selectedInbox &&
          selectedInbox?.inboxId === inboxId
        ) {
          queryClient.setQueryData(
            ["api", "inbox_list_with_overview", user?.email],
            (inboxes: any) => {
              return inboxes.map((inbox: any) => {
                if (inbox.inboxId === inboxId) {
                  return {
                    ...inbox,
                    status: true,
                  };
                }
                return inbox;
              });
            }
          );
        }
      });
    }
    return () => {
      socket.off("user-online");
      socket.off("user-offline");
      socket.off("new-message");
      socket.off("user-typing");
      socket.off("user-not-typing");
      socket && socket.disconnect();
    };
  }, [queryClient, selectedInbox, user]);

  const handleBack = () => {
    setSelectedInbox(null);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleLogout = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    signOutMutation.mutate();
  };

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
        <div className="container-md p-1 vh-100 d-flex flex-column">
          <div className="d-flex align-items-center p-2">
            <button
              className={`m-0 p-0 rounded-circle border-0 d-md-none ${
                isHover && isHover ? "text-primary shadow" : ""
              } ${selectedInbox && selectedInbox ? "" : "d-none"}`}
              onClick={handleBack}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <BsArrowLeftCircle
                style={{
                  height: "30px",
                  width: "30px",
                }}
              />
            </button>
            <h1 className="m-0 text-center flex-grow-1">Messages</h1>
            <button className="border-0 bg-transparent home-menu-button">
              <AiOutlineMenu
                style={{
                  height: "25px",
                  width: "25px",
                }}
              />
              <ul className="p-1 rounded">
                <li
                  className="px-4 py-2 rounded"
                  style={{
                    fontWeight: "bold",
                    // backgroundColor: "rgb(241, 51, 89)",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </button>
          </div>
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
