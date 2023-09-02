import { useAuthUser } from "@react-query-firebase/auth";
import { useQuery } from "react-query";
import { getInboxListWithOverView } from "../../query_controllers/inboxController";
import auth from "../../firebase/firebaseConfig";
import { InboxWithOverView } from "./InboxWithOverView";
import { InboxWithOverViewType } from "../../types";

export function InboxList() {
  const { data: user } = useAuthUser(["user"], auth);
  const { data: inboxListWithOverView } = useQuery({
    queryKey: ["api", "inbox_list_with_overview", user?.email],
    queryFn: getInboxListWithOverView,
    enabled: !!user,
  });
  return (
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
            (inboxWithOverView: InboxWithOverViewType, index: number) => {
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
  );
}
