import { InboxWithOverViewType, NonConnectedUserType } from "../../types";
import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";

import { FaCircle } from "react-icons/fa";

interface InboxWithOverViewPropsType {
  inboxWithOverView?: InboxWithOverViewType;
  user?: NonConnectedUserType;
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
      className="border-0 list-group-item list-group-item-action"
      onClick={handleClick}
    >
      {/* <div className="float-right badge bg-success">5</div> */}
      <div className="d-flex align-items-start">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar5.png"
          className="mr-1 rounded-circle"
          alt="Vanessa Tucker"
          width={40}
          height={40}
        />
        <div className="ml-3 flex-grow-1">
          {inboxWithOverView
            ? inboxWithOverView?.userDisplayName
            : user?.userDisplayName}
          <div className="small ">
            <div className="d-flex align-items-center" style={{ gap: "4px" }}>
              <FaCircle
                color={`${
                  inboxWithOverView && inboxWithOverView.status
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
