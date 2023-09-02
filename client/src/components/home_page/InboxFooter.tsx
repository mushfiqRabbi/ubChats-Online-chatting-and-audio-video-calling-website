import { useRef } from "react";

export function InboxFooter() {
  const msgInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-grow-0 px-4 py-3 border-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message"
          ref={msgInputRef}
        />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}
