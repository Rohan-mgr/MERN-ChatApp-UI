import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InputField from "./InputField";
import { BsFillSendFill } from "react-icons/bs";
import { useFormik } from "formik";
import { messageSchema } from "../../validation/validation";
// import { sendMessage } from "../../services/chat";
import { SocketContext } from "../../context/socket.context";
import Spinner from "react-bootstrap/Spinner";
import { CgCloseO } from "react-icons/cg";
import { CgAttachment } from "react-icons/cg";


export default function ChatBottom() {
  const { socket } = useContext(SocketContext);
  const { chatId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const messageInputElement = useRef(); 

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: !selectedFile && messageSchema,
    onSubmit: async (values, { resetForm }) => {
      // const payload = { ...values, chatId};
      const payload = {
        message: values.message,
        file: selectedFile,
        fileSize: selectedFile?.size || null,
        fileName: selectedFile?.name || null,
        fileType: selectedFile?.type || null,
        chatId,
      };
      console.log(payload, "payload submit>>>>>>>>>")
      try {
        console.log(values, "values")
        socket.emit("message:sent", payload);
        // const response = await sendMessage(payload);
        // console.log(response, 'response >>>>>>>>>>>');
        // if(response?.data?.chat?.isGroupChat) {
        //   socket.emit("new message", response?.data);
        // }
      } catch (error) {
        console.log(error);
      }
      setSelectedFile(null);
      resetForm();
    },
  });

  const handleFileChange = (event) => {
    const fileInput = event.currentTarget;
    const file = fileInput.files[0];
    setSelectedFile(file);
    if(event.currentTarget.files[0]) {
      messageInputElement.current.focus();
    }
    event.target.value =  null;
  };
  const handleFileDeselect = () => {
    setSelectedFile(null);
  };
  
  return (
    <div className="chat__bottom">
      <form autoComplete="off" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="chat__bottom__input">
          <label>
            <input type="file" onChange={handleFileChange}/>
            <span>+</span>
          </label>
          <InputField
            type="text"
            name="message"
            refEl={messageInputElement}
            placeholder="Message..."
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.message}
          />
        </div>
        {selectedFile && (
        <div className="selected__file">
          <div className="image__wrapper" style={{maxWidth: selectedFile?.type.split("/")[0] === "image" ? "80px": "auto"}}>
            {selectedFile?.type.split("/")[0] === "image" ?
             <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
              /> 
              : 
             <p className="attachment__wrapper"><CgAttachment className="attachment__icon" /> {selectedFile?.name}</p>
              }
            <CgCloseO onClick={handleFileDeselect} className="image__deselect"/>
          </div>
        </div>
      )}
        <div className="chat__bottom__send">
          <button type="submit">
            {formik.isSubmitting ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <BsFillSendFill />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
