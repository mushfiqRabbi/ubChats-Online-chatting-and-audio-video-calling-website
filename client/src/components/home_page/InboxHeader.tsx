import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useAuthUser } from "@react-query-firebase/auth";
import { getInboxListWithOverView } from "../../controllers/query_controllers/inboxController";
import auth from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { ConnectedInboxWithOverview } from "../../types";

let status: string;

export function InboxHeader() {
  const [selectedInbox] = useAtom(selectedInboxAtom);
  const { data: user } = useAuthUser(["user"], auth);
  const { data: inboxListWithOverView } = useQuery({
    queryKey: ["api", "inbox_list_with_overview", user?.email],
    queryFn: getInboxListWithOverView,
    enabled: !!user,
  });

  if (selectedInbox && inboxListWithOverView) {
    status = inboxListWithOverView.find(
      (inboxWithOverview: ConnectedInboxWithOverview) =>
        inboxWithOverview.userEmail === selectedInbox?.userEmail
    )?.status;
  }

  const handleAudioCall = () => {
    toast.info("Feature coming soon!");
  };

  const handleVideoCall = () => {
    toast.info("Feature coming soon!");
  };
  return (
    <div className="py-2 border-bottom d-block px-md-4">
      <div className="py-1 d-flex align-items-center">
        <div className="position-relative">
          {/* <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            className="mr-1 rounded-circle"
            alt="Sharon Lessman"
            width={40}
            height={40}
          /> */}
          <div
            className="rounded-circle bg-secondary d-flex justify-content-center align-items-center "
            style={{
              height: "50px",
              width: "50px",
            }}
          >
            <p
              className="m-0"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {selectedInbox && selectedInbox.userDisplayName[0].toUpperCase()}
            </p>
          </div>
        </div>
        <div className="pl-3 flex-grow-1">
          <strong>{selectedInbox && selectedInbox.userDisplayName}</strong>
          <div className="text-muted small">
            {/* <em>Typing...</em> */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <FaCircle color={`${status && status ? "green" : "red"}`} />
              <span>
                {status && status
                  ? status === "typing"
                    ? "Typing..."
                    : "Online"
                  : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            gap: "10px",
          }}
        >
          <button
            className="rounded bg-primary"
            style={{
              border: "0",
              padding: "10px 15px",
              color: "white",
            }}
            onClick={handleAudioCall}
          >
            <BiPhoneCall
              style={{
                height: "25px",
                width: "25px",
              }}
            />
          </button>
          <button
            className="rounded bg-info"
            style={{
              border: "0",
              padding: "10px 15px",
              color: "white",
            }}
            onClick={handleVideoCall}
          >
            <AiOutlineVideoCamera
              style={{
                height: "25px",
                width: "25px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
