import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { searchUsers } from "../../services/user";
import { SocketContext } from "../../context/socket.context";
import { createGroupChat } from "../../services/chat";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import useFetchChats from "../../hooks/useFetchChats";
import Badge from "react-bootstrap/Badge";
import { IoCloseCircle } from "react-icons/io5";
import NameInitials from "./NameInitials";

export default function RoomModal({ show, handleClose }) {
  const navigate = useNavigate();
  const { setChats } = useFetchChats();
  const { socket } = useContext(SocketContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [groupChatUsers, setGroupChatUsers] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    setSearchedUsers([]);
    setGroupChatUsers([]);
  }, []);
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (_, { resetForm }) => {
      resetForm();
      console.log("submitted");
      setShowSearch(false);
    },
  });

  const handleInputChange = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    if (searchValue.length > 0) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
    try {
      const response = await searchUsers(searchValue);
      setSearchedUsers(response?.data?.users);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleUserClick = (user) => {
    setGroupChatUsers((prevState) => {
      return [...prevState, user];
    });
    setShowSearch(false);
  };

  const handleRoomUserRemoval = (userId) => {
    const updatedUsers = groupChatUsers.filter((user) => user?._id !== userId);
    setGroupChatUsers(updatedUsers);
  };

  const handleCreateRoom = async () => {
    try {
      const uniqueRoomId = uuidv4();
      const response = await createGroupChat(roomName, uniqueRoomId, groupChatUsers);
      console.log(response, "create room >>>>>>>>>>>>>>>>>>>>>>", roomName, uniqueRoomId);
      navigate(`/chat/${response?.data?._id}`, {
        state: { name: response?.data?.groupName, isGroupChat: response?.data?.isGroupChat, chat: response?.data },
      });
      setChats((prevState) => {
        return [response?.data, ...prevState];
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
    socket.emit("create", roomName);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="mb-2"
          type="text"
          placeholder="Room Name"
          name="roomName"
          autoComplete="off"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <div className="side__nav__search">
          <form onSubmit={formik.handleSubmit}>
            <BsSearch />
            <input
              type="text"
              placeholder="Search People"
              name="search"
              autoComplete="off"
              value={formik.values.search}
              onChange={(e) => {
                formik.handleChange(e);
                handleInputChange(e);
              }}
            />
          </form>
        </div>

        <div className="selected__users">
          {groupChatUsers.length > 0 &&
            groupChatUsers.map((user) => (
              <Badge key={user?._id} id="user__badge">
                {user?.fullName} <IoCloseCircle onClick={() => handleRoomUserRemoval(user?._id)} />
              </Badge>
            ))}
        </div>

        {showSearch && searchedUsers.length > 0 && (
          <div className="searched__users">
            {searchedUsers.map((user) => (
              <NameInitials
                key={user?._id}
                handleClick={() => {
                  formik.values.search = "";
                  handleUserClick(user);
                }}
                name={user?.fullName}
                profile={user?.profileUrl}
              />
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RoomModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};
