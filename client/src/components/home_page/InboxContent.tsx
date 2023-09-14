import { InboxFooter } from "./InboxFooter";
import { InboxHeader } from "./InboxHeader";
import { InboxMessages } from "./InboxMessages";
import { selectedInboxAtom } from "../../jotai_atoms";
import { useAtom } from "jotai";

const InboxContent = () => {
  const [selectedInbox] = useAtom(selectedInboxAtom);

  return (
    selectedInbox && (
      <div className="flex col-12 col-lg-7 col-xl-9 d-flex flex-column justify-content-between px-1">
        <InboxHeader />
        <InboxMessages />
        <InboxFooter />
      </div>
    )
  );
};

export default InboxContent;
