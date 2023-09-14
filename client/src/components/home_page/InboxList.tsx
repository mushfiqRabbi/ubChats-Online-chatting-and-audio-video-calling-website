import { useAuthUser } from "@react-query-firebase/auth";
import { useQuery } from "react-query";
import {
  getInboxListWithOverView,
  getNonConnectedUsers,
} from "../../controllers/query_controllers/inboxController";
import auth from "../../firebase/firebaseConfig";
import { InboxWithOverView } from "./InboxWithOverView";
import { ConnectedInboxWithOverview } from "../../types";
import { BsSearch } from "react-icons/bs";
import { useAtom } from "jotai";
import {
  searchTermAtom,
  isSearchListAtom,
  connectedInboxesAtom,
  searchNonConnectedUsersAtom,
  selectedInboxAtom,
} from "../../jotai_atoms";
import { useRef, useEffect } from "react";
import { NonConnectedInboxWithOverviewType } from "../../types";

export function InboxList() {
  const { data: user } = useAuthUser(["user"], auth);
  const [, setSearchTerm] = useAtom(searchTermAtom);
  const [isSearchList, setIsSearchList] = useAtom(isSearchListAtom);
  const [searchNonConnectedUsers, setSearchNonConnectedUsers] = useAtom(
    searchNonConnectedUsersAtom
  );
  const [selectedInbox] = useAtom(selectedInboxAtom);
  const [connectedInboxes, setConnectedInboxes] = useAtom(connectedInboxesAtom);
  const searchTermRef = useRef<HTMLInputElement>(null);
  const { data: inboxListWithOverView } = useQuery({
    queryKey: ["api", "inbox_list_with_overview", user?.email],
    queryFn: getInboxListWithOverView,
    enabled: !!user,
  });

  const { data: nonConnectedUsers } = useQuery({
    queryKey: [
      "api",
      "users",
      "non_connected_users",
      searchTermRef.current?.value && searchTermRef.current.value,
    ],
    queryFn: getNonConnectedUsers,
    enabled: !!searchNonConnectedUsers,
  });

  const changeSearchTerm = () => {
    if (searchTermRef.current?.value === "") {
      setIsSearchList(false);
      setSearchNonConnectedUsers(false);
    }
  };

  const handleSearch = () => {
    // setSearchNonConnectedUsers(false);
    // setConnectedInboxes([]);
    if (searchTermRef.current?.value === user?.email) {
      // setIsSearchList(false);
      return;
    }
    const ci = inboxListWithOverView.filter(
      (inbox: ConnectedInboxWithOverview) =>
        inbox.userEmail === searchTermRef.current?.value
    );
    if (ci.length >= 1) {
      setSearchNonConnectedUsers(false);
      setIsSearchList(true);
      setConnectedInboxes(ci);
    } else {
      setIsSearchList(true);
      setSearchNonConnectedUsers(true);
      setConnectedInboxes([]);
    }
  };

  useEffect(() => {
    if (searchTermRef.current) {
      setSearchTerm(searchTermRef.current);
    }
  }, []);

  return (
    <div
      className={`col-12 col-lg-5 col-xl-3 border-right position-relative overflow-auto px-0   d-md-block flex-column ${
        selectedInbox && selectedInbox ? "d-none" : "d-flex"
      }`}
    >
      <div
        className="d-block position-absolute bg-white px-2 px-md-4"
        style={{
          zIndex: "1",
          width: "100%",
          left: "0",
        }}
      >
        <div className="d-flex align-items-center">
          <div className="flex-grow-1 d-flex align-items-center " style={{}}>
            <input
              type="text"
              className="my-3 form-control"
              placeholder="Search By Email"
              style={{
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
              // value={searchTerm}
              onChange={changeSearchTerm}
              ref={searchTermRef}
            />
            <button
              className=" btn btn-primary "
              style={{
                padding: "5px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              onClick={handleSearch}
            >
              <BsSearch color="white" size="24px" />
            </button>
          </div>
        </div>
      </div>
      <div
        className="flex-grow-1  flex-grow-md-0"
        style={{
          paddingTop: "70px",
        }}
      >
        {!isSearchList &&
          inboxListWithOverView &&
          inboxListWithOverView
            .sort(
              (
                a: ConnectedInboxWithOverview,
                b: ConnectedInboxWithOverview
              ) => {
                return (
                  Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate)
                );
              }
            )
            .map(
              (
                inboxWithOverView: ConnectedInboxWithOverview,
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
        {isSearchList &&
          connectedInboxes &&
          connectedInboxes.length >= 1 &&
          connectedInboxes.map(
            (inboxWithOverView: ConnectedInboxWithOverview, index: number) => {
              return (
                <InboxWithOverView
                  key={index}
                  inboxWithOverView={inboxWithOverView}
                />
              );
            }
          )}
        {isSearchList &&
        searchNonConnectedUsers &&
        nonConnectedUsers &&
        nonConnectedUsers.length >= 1
          ? nonConnectedUsers.map(
              (user: NonConnectedInboxWithOverviewType, index: number) => {
                return <InboxWithOverView key={index} user={user} />;
              }
            )
          : ""}
      </div>
      <hr className="mt-1 mb-0 d-block d-lg-none" />
    </div>
  );
}
