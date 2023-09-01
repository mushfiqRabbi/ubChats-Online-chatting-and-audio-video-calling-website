import { InboxWithOverViewType } from "../../types";
import { useAtom } from "jotai";
import { selectedInboxAtom } from "../../jotai_atoms";

export function InboxWithOverView({
  inboxWithOverView,
}: {
  inboxWithOverView: InboxWithOverViewType;
}) {
  const [, setSelectedInbox] = useAtom(selectedInboxAtom);
  const handleClick = () => {
    setSelectedInbox(inboxWithOverView);
  };
  return (
    <div
      className="border-0 list-group-item list-group-item-action"
      onClick={handleClick}
    >
      <div className="float-right badge bg-success">5</div>
      <div className="d-flex align-items-start">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar5.png"
          className="mr-1 rounded-circle"
          alt="Vanessa Tucker"
          width={40}
          height={40}
        />
        <div className="ml-3 flex-grow-1">
          {inboxWithOverView && inboxWithOverView.userDisplayName}
          <div className="small">
            <span className="fas fa-circle chat-online" /> Online
          </div>
        </div>
      </div>
    </div>
  );
}
