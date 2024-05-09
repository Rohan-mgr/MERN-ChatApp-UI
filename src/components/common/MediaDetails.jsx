import React, { useMemo } from "react";
import { filterMessages } from "../../helper/chat";

function MediaDetails({ messages, mediaType }) {
  let mediaTypes = ["image/png", "image/jpeg", "image/jpg", "application/octet-stream", "image/gif"];

  let fileTypes = [
    "application/pdf",
    "text/plain",
    "application/octet-stream",
    null,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const filteredMediaMsg = useMemo(() => filterMessages(messages, mediaTypes), [messages]);

  const filteredFileMsg = useMemo(() => filterMessages(messages, fileTypes), [messages]);

  return (
    <div className="media__details">
      {mediaType === "photos" ? (
        <div className="media__photos">
          {filteredMediaMsg?.length > 0 ? (
            filteredMediaMsg?.map((m, i) => <img key={i} src={m?.attachment?.fileUrl} alt={m?.attachment?.name} />)
          ) : (
            <p>No media & photos shared.</p>
          )}
        </div>
      ) : (
        <div className="media__files">
          {filteredFileMsg?.length > 0 ? (
            filteredFileMsg?.map((m, i) => (
              <a key={i} rel="noreferrer" href={m?.attachment?.fileUrl} target="_blank">
                {m?.attachment?.name}
              </a>
            ))
          ) : (
            <p>No files shared.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaDetails;
