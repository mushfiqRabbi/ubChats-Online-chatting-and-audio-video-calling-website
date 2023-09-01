import { useQuery } from "react-query";
import axios from "axios";

async function getInboxDetails({ queryKey }: any) {
  console.log(queryKey);
  const response = await axios.get(
    `http://localhost:3000/api/inbox-details?inbox-id=${queryKey[1]}&user-email=${queryKey[2]}`
  );
  return response.data;
}

export function Inbox({ item, user, inboxes, handleOpenInbox }: any) {
  const { data: inboxDetails } = useQuery({
    queryKey: [
      "api",
      item._id,
      item["belongs_to"].find((email: string) => email !== user.email),
    ],
    queryFn: getInboxDetails,
    enabled: !!inboxes,
  });

  return (
    <div
      className="border-0 list-group-item list-group-item-action"
      onClick={handleOpenInbox.bind(item)}
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
          {inboxDetails && inboxDetails.userEmail}
          <div className="small">
            <span className="fas fa-circle chat-online" /> Online
          </div>
        </div>
      </div>
    </div>
  );
}
