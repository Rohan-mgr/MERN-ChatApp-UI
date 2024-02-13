import { useState, useContext} from "react";
import Button from "../../components/common/Button";
import { _remove, _getSecureLs } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchChats from "../../hooks/useFetchChats";
import NameInitials from "../../components/common/NameInitials";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { startChat } from "../../services/chat";
import { searchUsers } from "../../services/user";
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from "../../components/common/Modal";
import { SocketContext } from "../../context/socket.context";

function SideNav() {
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { isLoading, chats, setChats } = useFetchChats();
  const { user } = _getSecureLs("auth");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

  const handleSearchedUserClick = async (userId, userFullName, user) => {
    try {
      const response = await startChat(userId);
      console.log(response, "response searched user click");
      navigate(`/chat/${response?.data?._id}`, {
        state: {name: userFullName, userId, user},
      });
      setChats((prevState) => {
        return [response?.data, ...prevState];
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleLogout = () => {
    _remove("auth");
    navigate("/");
  };

  return (
    <div className="side__nav">
      <Modal show={show} handleClose={handleClose} />
      <div className="side__nav__header">
        <h3>Chats</h3>
        <div className="side__nav__header__button__wrapper">
          <Button type="button" handleClick={handleLogout}>
            Log Out
          </Button>
        </div>
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
      <div>
        <button onClick={handleShow}>Create Room</button>
      </div>
      {!showSearch ? (
        <div className="side__nav__users">
          {isLoading ? (
            <ScaleLoader color="#0D6EFD" style={{ textAlign: "center" }} />
          ) : chats?.length > 0 ? (
            chats?.map((chat) => {
              let chatUserId = chat?.users[0]?._id;
              let toggleUser = chat.users[0]?._id === user?._id ? 1 : 0;
              let name = chat?.isGroupChat
                ? chat?.groupName
                : chat?.users[toggleUser]?.fullName;
              let chatUser = chat?.users[toggleUser];
              return (
                <NameInitials
                  key={chat?._id}
                  handleClick={() => {
                    // setSelectedChat(chat);
                    navigate(`chat/${chat?._id}`, {
                      state: {name: name, isGroupChat: chat?.isGroupChat, userId: chatUserId, user: chatUser}
                    });
                  }}
                  name={name}
                  userId={user?._id}
                  chatId={chat?._id}
                  isHeading={true}
                  socket={socket}
                />
              );
            })
          ) : (
            <p>No Chats Found!</p>
          )}
        </div>
      ) : (
        <div className="side__nav__searchedUsers">
          {searchedUsers?.map((user) => {
            return (
              <NameInitials
                key={user?._id}
                handleClick={() => {
                  handleSearchedUserClick(user?._id, user?.fullName, user);
                  formik.values.search = "";
                  setShowSearch(false);
                }}
                name={user?.fullName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SideNav;
