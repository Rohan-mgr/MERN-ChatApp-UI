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
import { v4 as uuidv4 } from 'uuid';
import useFetchChats from "../../hooks/useFetchChats";
  


export default function RoomModal({ show, handleClose }) {
  const navigate = useNavigate();
  const { setChats } = useFetchChats();
  const { socket } = useContext(SocketContext);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    setSearchedUsers([]);
    setSelectedUsers([]);
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
    setSelectedUsers((prevState) => {
      return [...prevState, user];
    });
    setShowSearch(false);
  };

  const handleRoomUserRemoval = (userId) => {
    const updatedUsers = selectedUsers.filter(user => user?._id !== userId); 
    setSelectedUsers(updatedUsers);
  }

  const handleCreateRoom = async () => {
    try {
      const uniqueRoomId = uuidv4();
      const response = await createGroupChat(roomName, uniqueRoomId, selectedUsers);
      console.log(response, "create room >>>>>>>>>>>>>>>>>>>>>>", roomName, uniqueRoomId);
      navigate(`/chat/${response?.data?._id}`, {
        state: {name: roomName, isGroupChat: response?.data?.isGroupChat},
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
        <div className="selected__users">
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => <p key={user?._id}>{user?.fullName} <span onClick={() => handleRoomUserRemoval(user?._id)}>x</span></p>)}
        </div>
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

        {showSearch && searchedUsers.length > 0 && (
          <div className="searched__users">
            {searchedUsers.map((user) => (
              <p
                key={user?._id}
                style={{ cursor: "pointer" }}
                onClick={() => {formik.values.search = ""; handleUserClick(user)}}
              >
                {user?.fullName}
              </p>
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
  handleClose: PropTypes.func
}