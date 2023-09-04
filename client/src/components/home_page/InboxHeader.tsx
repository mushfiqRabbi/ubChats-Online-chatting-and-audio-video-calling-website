import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useAuthUser } from "@react-query-firebase/auth";
import { getInboxListWithOverView } from "../../controllers/query_controllers/inboxController";
import auth from "../../firebase/firebaseConfig";

let status;

export function InboxHeader() {
  const [selectedInbox] = useAtom(selectedInboxAtom);
  const { data: user } = useAuthUser(["user"], auth);
  const { data: inboxListWithOverView } = useQuery({
    queryKey: ["api", "inbox_list_with_overview", user?.email],
    queryFn: getInboxListWithOverView,
    enabled: !!user,
  });

  if (selectedInbox) {
    status = inboxListWithOverView.find(
      (inboxWithOverview) =>
        inboxWithOverview.userEmail === selectedInbox?.userEmail
    ).status;
  }

  return (
    <div className="px-4 py-2 border-bottom d-none d-lg-block">
      <div className="py-1 d-flex align-items-center">
        <div className="position-relative">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            className="mr-1 rounded-circle"
            alt="Sharon Lessman"
            width={40}
            height={40}
          />
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
        <div>
          <button className="px-3 mr-1 btn btn-primary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-phone feather-lg"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          <button className="px-3 mr-1 btn btn-info btn-lg d-none d-md-inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-video feather-lg"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
            </svg>
          </button>
          <button className="px-3 border btn btn-light btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-horizontal feather-lg"
            >
              <circle cx={12} cy={12} r={1} />
              <circle cx={19} cy={12} r={1} />
              <circle cx={5} cy={12} r={1} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
