import {
  ConnectedInboxWithOverview,
  NonConnectedInboxWithOverviewType,
} from "../../types";
import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";

import { FaCircle } from "react-icons/fa";

interface InboxWithOverViewPropsType {
  inboxWithOverView?: ConnectedInboxWithOverview;
  user?: NonConnectedInboxWithOverviewType;
}

export function InboxWithOverView({
  inboxWithOverView,
  user,
}: InboxWithOverViewPropsType) {
  const [, setSelectedInbox] = useAtom(selectedInboxAtom);
  const handleClick = () => {
    if (inboxWithOverView) {
      setSelectedInbox(inboxWithOverView);
    }
    if (user) {
      setSelectedInbox(user);
    }
  };
  return (
    <div
      className="list-group-item list-group-item-action"
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {/* <div className="float-right badge bg-success">5</div> */}
      <div className="d-flex align-items-start">
        {/* <img
          src="https://bootdey.com/img/Content/avatar/avatar5.png"
          className="mr-1 rounded-circle"
          alt="Vanessa Tucker"
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
            {inboxWithOverView
              ? inboxWithOverView?.userDisplayName[0].toUpperCase()
              : user?.userDisplayName[0].toUpperCase()}
          </p>
        </div>
        <div className="ml-3 flex-grow-1">
          {inboxWithOverView
            ? inboxWithOverView?.userDisplayName
            : user?.userDisplayName}
          <div className="small ">
            <div className="d-flex align-items-center" style={{ gap: "4px" }}>
              <FaCircle
                color={`${
                  inboxWithOverView && inboxWithOverView?.status
                    ? "green"
                    : "red"
                }`}
                style={{ height: "10px", width: "10px" }}
              />
              <span>
                {inboxWithOverView && inboxWithOverView?.status
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
