import { Helmet, HelmetProvider } from "react-helmet-async";
import "./Home.css";
import { useRef } from "react";
import { useState } from "react";
import { useLayoutEffect, useEffect } from "react";
// import { socket } from "../../utils/socket";
import { io } from "socket.io-client";
import { useAuthUser } from "@react-query-firebase/auth";
import auth from "../../firebase/firebaseConfig";

export default function Home() {
  const { data: user } = useAuthUser(["user"], auth);
  const [chatBoxMessagesHeight, setChatBoxMessagesHeight] = useState(0);
  const [chatsHeight, setChatsHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const chatsRef = useRef<HTMLDivElement>(null);
  const chatBoxHeaderRef = useRef<HTMLDivElement>(null);
  const chatBoxFooterRef = useRef<HTMLDivElement>(null);
  const chatBoxMessagesRef = useRef<HTMLDivElement>(null);

  if (scrollHeight && chatBoxMessagesRef.current) {
    chatBoxMessagesRef.current.scrollTop = scrollHeight;
  }

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("working");
    });
  }, []);

  useLayoutEffect(() => {
    const height = window.innerHeight;
    if (
      chatsRef.current &&
      chatBoxMessagesRef.current &&
      chatBoxFooterRef.current &&
      chatBoxHeaderRef.current
    ) {
      setChatsHeight(
        height - Math.round(chatsRef.current.getBoundingClientRect().top)
      );
      setChatBoxMessagesHeight(
        height -
          (Math.round(chatBoxHeaderRef.current.getBoundingClientRect().top) +
            Math.round(
              chatBoxFooterRef.current.getBoundingClientRect().height +
                chatBoxFooterRef.current.getBoundingClientRect().height
            ))
      );
      setTimeout(() => {
        if (chatBoxMessagesRef.current) {
          setScrollHeight(chatBoxMessagesRef.current?.scrollHeight);
        }
      }, 100);
    }
  }, []);

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
        <div
          className="container p-0"
          style={{
            height: "100vh",
            display: "flex",
            flexFlow: "column",
          }}
        >
          <h1 className="mb-3 h3">Messages</h1>
          <div
            className="card"
            style={{
              flexGrow: "1",
            }}
          >
            <div
              className="row g-0"
              style={{
                height: "100%",
              }}
            >
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
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
                  ref={chatsRef}
                  style={{
                    maxHeight: `${chatsHeight}px`,
                    overflowY: "auto",
                  }}
                >
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
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
                        Vanessa Tucker
                        <div className="small">
                          <span className="fas fa-circle chat-online" /> Online
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="float-right badge bg-success">2</div>
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        className="mr-1 rounded-circle"
                        alt="William Harris"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        William Harris
                        <div className="small">
                          <span className="fas fa-circle chat-online" /> Online
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="mr-1 rounded-circle"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Sharon Lessman
                        <div className="small">
                          <span className="fas fa-circle chat-online" /> Online
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        className="mr-1 rounded-circle"
                        alt="Christina Mason"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Christina Mason
                        <div className="small">
                          <span className="fas fa-circle chat-offline" />{" "}
                          Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        className="mr-1 rounded-circle"
                        alt="Fiona Green"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Fiona Green
                        <div className="small">
                          <span className="fas fa-circle chat-offline" />{" "}
                          Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        className="mr-1 rounded-circle"
                        alt="Doris Wilder"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Doris Wilder
                        <div className="small">
                          <span className="fas fa-circle chat-offline" />{" "}
                          Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar4.png"
                        className="mr-1 rounded-circle"
                        alt="Haley Kennedy"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Haley Kennedy
                        <div className="small">
                          <span className="fas fa-circle chat-offline" />{" "}
                          Offline
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="border-0 list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="mr-1 rounded-circle"
                        alt="Jennifer Chang"
                        width={40}
                        height={40}
                      />
                      <div className="ml-3 flex-grow-1">
                        Jennifer Chang
                        <div className="small">
                          <span className="fas fa-circle chat-offline" />{" "}
                          Offline
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <hr className="mt-1 mb-0 d-block d-lg-none" />
              </div>
              <div className="flex col-12 col-lg-7 col-xl-9 d-flex flex-column">
                <div
                  className="px-4 py-2 border-bottom d-none d-lg-block"
                  ref={chatBoxHeaderRef}
                >
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
                      <strong>Sharon Lessman</strong>
                      <div className="text-muted small">
                        <em>Typing...</em>
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
                          <rect
                            x={1}
                            y={5}
                            width={15}
                            height={14}
                            rx={2}
                            ry={2}
                          />
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
                <div
                  className=""
                  style={{
                    flexGrow: "1",
                    height: `${chatBoxMessagesHeight}px`,
                  }}
                >
                  <div
                    className="p-4 chat-messages"
                    ref={chatBoxMessagesRef}
                    style={{
                      height: "100%",
                      overflowY: "auto",
                      visibility: `${scrollHeight ? "visible" : "hidden"}`,
                    }}
                  >
                    <div>
                      <div className="pb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:33 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Lorem ipsum dolor sit amet, vis erat denique in,
                          dicunt prodesset te vix.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:34 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Sit meis deleniti eu, pri vidit meliore docendi ut, an
                          eum erat animal commodo.
                        </div>
                      </div>
                      <div className="mb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:35 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Cum ea graeci tractatos.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:36 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Sed pulvinar, massa vitae interdum pulvinar, risus
                          lectus porttitor magna, vitae commodo lectus mauris et
                          velit. Proin ultricies placerat imperdiet. Morbi
                          varius quam ac venenatis tempus.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:37 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Cras pulvinar, sapien id vehicula aliquet, diam velit
                          elementum orci.
                        </div>
                      </div>
                      <div className="mb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:38 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Lorem ipsum dolor sit amet, vis erat denique in,
                          dicunt prodesset te vix.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:39 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Sit meis deleniti eu, pri vidit meliore docendi ut, an
                          eum erat animal commodo.
                        </div>
                      </div>
                      <div className="mb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:40 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Cum ea graeci tractatos.
                        </div>
                      </div>
                      <div className="mb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:41 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Morbi finibus, lorem id placerat ullamcorper, nunc
                          enim ultrices massa, id dignissim metus urna eget
                          purus.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:42 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Sed pulvinar, massa vitae interdum pulvinar, risus
                          lectus porttitor magna, vitae commodo lectus mauris et
                          velit. Proin ultricies placerat imperdiet. Morbi
                          varius quam ac venenatis tempus.
                        </div>
                      </div>
                      <div className="mb-4 chat-message-right">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="mr-1 rounded-circle"
                            alt="Chris Wood"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:43 am
                          </div>
                        </div>
                        <div className="px-3 py-2 mr-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">You</div>
                          Lorem ipsum dolor sit amet, vis erat denique in,
                          dicunt prodesset te vix.
                        </div>
                      </div>
                      <div className="pb-4 chat-message-left">
                        <div>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            className="mr-1 rounded-circle"
                            alt="Sharon Lessman"
                            width={40}
                            height={40}
                          />
                          <div className="mt-2 text-muted small text-nowrap">
                            2:44 am
                          </div>
                        </div>
                        <div className="px-3 py-2 ml-3 rounded flex-shrink-1 bg-light">
                          <div className="mb-1 font-weight-bold">
                            Sharon Lessman
                          </div>
                          Sit meis deleniti eu, pri vidit meliore docendi ut, an
                          eum erat animal commodo.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex-grow-0 px-4 py-3 border-top"
                  ref={chatBoxFooterRef}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                    />
                    <button className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}
