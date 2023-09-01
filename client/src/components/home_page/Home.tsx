import InboxContent from "./InboxContent";
import { InboxWithOverView } from "./InboxWithOverView";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { initiatePrimarySocket } from "../../utils/socket";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";
import { useQuery } from "react-query";
import "./Home.css";
import { getInboxListWithOverView } from "../../query_controllers/inboxController";
import { InboxWithOverViewType } from "../../types";
import { Socket } from "socket.io-client";

let socket: Socket;

export default function Home() {
  const { data: user } = useAuthUser(["user"], auth);
  const { data: inboxListWithOverView } = useQuery({
    queryKey: ["api", "inbox_list_with_overview", user?.email],
    queryFn: getInboxListWithOverView,
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      socket = initiatePrimarySocket(user?.email as string);
      // socket.on("connect", () => {
      //   console.log("socket connection successful");
      // });
      return () => {
        socket.disconnect();
      };
    }
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
              <div className="col-12 col-lg-5 col-xl-3 border-right position-relative overflow-auto">
                <div
                  className="px-4 d-none d-md-block position-fixed bg-white"
                  style={{
                    zIndex: "1",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        className="my-3 form-control"
                        placeholder="Search..."
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingTop: "70px",
                  }}
                >
                  {inboxListWithOverView &&
                    inboxListWithOverView.map(
                      (
                        inboxWithOverView: InboxWithOverViewType,
                        index: number
                      ) => {
                        return (
                          <InboxWithOverView
                            key={index}
                            inboxWithOverView={inboxWithOverView}
                          />
                        );
                      }
                    )}
                </div>
                <hr className="mt-1 mb-0 d-block d-lg-none" />
              </div>
              <InboxContent />
            </div>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}
