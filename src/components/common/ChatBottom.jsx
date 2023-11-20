import { useContext } from "react";
import { useParams } from "react-router-dom";
import InputField from "./InputField";
import { BsFillSendFill } from "react-icons/bs";
import { useFormik } from "formik";
import { messageSchema } from "../../validation/validation";
import { sendMessage } from "../../services/chat";
import { SocketContext } from "../../context/socket.context";
import Spinner from "react-bootstrap/Spinner";

export default function ChatBottom() {
  const { socket } = useContext(SocketContext);
  const { chatId } = useParams();
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: messageSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = { ...values, chatId };
      try {
        // console.log(values, "values")
        // socket.emit("message:sent", payload);
        const response = await sendMessage(payload);
        console.log(response, 'response >>>>>>>>>>>');
        if(response?.data?.chat?.isGroupChat) {
          socket.emit("new message", response?.data);
        }
      } catch (error) {
        console.log(error);
      }
      resetForm();
    },
  });
  return (
    <div className="chat__bottom">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="chat__bottom__input">
          <InputField
            type="text"
            name="message"
            placeholder="Message..."
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.message}
          />
        </div>
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
