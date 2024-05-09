import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCamera } from "react-icons/fa";
import { updateUserProfile } from "../../services/user";
import { useFormik } from "formik";
import useFetchUsers from "../../hooks/useFetchUsers";
import useFetchChats from "../../hooks/useFetchChats";
import { _getSecureLs, _setSecureLs } from "../../utils/storage";

function UploadProfileModal({ show, handleProfileModal, userId }) {
  const auth = _getSecureLs("auth");
  const [selectedFile, setSelectedFile] = useState(null);
  const { users, setUsers } = useFetchUsers();
  const { chats, setChats } = useFetchChats();

  const { chatId } = useParams();

  const handleFileChange = (event) => {
    const fileInput = event.currentTarget;
    const file = fileInput.files[0];
    setSelectedFile(file);
    event.target.value = null;
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (_, { resetForm }) => {
      const payload = {
        file: selectedFile,
        userId,
      };
      try {
        console.log("submiteddd");
        const response = await updateUserProfile(payload);
        console.log(response, "response update profile");
        let updatedUser = response?.data.updatedUser;

        let updatedAuth = {
          ...auth,
          user: updatedUser,
        };
        console.log(updatedAuth, "updatedAuth>>>>");
        _setSecureLs("auth", updatedAuth);

        const updateExistingUser = users.map((user) => {
          if (user?._id === updatedUser?._id) {
            return { ...user, profileUrl: updatedUser?.profileUrl }; // replace "new_value" with the new value for profileUrl
          }
          return user;
        });
        setUsers(updateExistingUser);

        const updatedChat = chats.map((chat) => {
          if (chat?._id === chatId) {
            const updatedChatUser = chat?.users.map((user) => {
              if (user?._id === updatedUser?._id) {
                return { ...user, profileUrl: updatedUser?.profileUrl }; // replace "new_value" with the new value for profileUrl
              }
              return user;
            });
            console.log("inside updated chat");
            return { ...chat, users: updatedChatUser }; // replace "new_value" with the new value for profileUrl
          }
          return chat;
        });
        setChats(updatedChat);

        handleProfileModal();
      } catch (error) {
        console.log(error);
      }
      setSelectedFile(null);
      resetForm();
    },
  });

  return (
    <Modal show={show} onHide={handleProfileModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Your Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off" onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <label className="upload__profile__label">
            <input type="file" name="profile" onChange={handleFileChange} accept="image/*" />
            <span style={{ background: "#0275d8" }}>
              <FaCamera />
            </span>
          </label>
          <div className="profile__preview">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} />
            ) : (
              <p>Preview your profile</p>
            )}
          </div>

          <Button variant="success" type="submit">
            {formik.isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UploadProfileModal;
