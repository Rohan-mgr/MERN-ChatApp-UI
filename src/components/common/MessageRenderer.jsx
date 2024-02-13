import React from "react";
import ChatItem from "./ChatItem";
import { PiFilesFill } from "react-icons/pi";

const RenderMsg = ({msg, user}) => { 
    let mediaTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/octet-stream', 'image/gif'];
    let attachment  = msg?.attachment;
    return <React.Fragment>
        {msg?.content && <ChatItem
            key={msg?._id}
            name={msg?.sender?.fullName}
            isSender={user?._id === msg?.sender?._id ? true : false}
          >
            {msg?.content}
        </ChatItem>}

        {attachment &&  <ChatItem
          key={msg?._id + attachment?.name}
          name={msg?.sender?.fullName}
          isSender={user?._id === msg?.sender?._id ? true : false}
        >
          {mediaTypes.includes(attachment?.type) ? <div className="chat__item__image__wrapper"><img src={attachment?.fileUrl} alt={attachment?.name} /></div> : <a href={attachment?.fileUrl} target="_blank" rel="noreferrer"><span className="msg__file__icon"><PiFilesFill /></span> {attachment?.name}</a>}
        </ChatItem>}
    </React.Fragment>
}
export default RenderMsg;