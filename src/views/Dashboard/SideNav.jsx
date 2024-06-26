import { useState, useContext } from "react";
import Button from "../../components/common/Button";
import { _remove, _getSecureLs } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import useFetchChats from "../../hooks/useFetchChats";
import NameInitials from "../../components/common/NameInitials";
import { useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
import { searchUsers } from "../../services/user";
import ScaleLoader from "react-spinners/ScaleLoader";
import Modal from "../../components/common/Modal";
import { SocketContext } from "../../context/socket.context";
import { MdLogout } from "react-icons/md";
import UploadProfileModal from "../../components/common/UploadProfileModal";
import { ChatContext } from "../../context/chat.context";

function SideNav() {
  const navigate = useNavigate();
  const { socket, activeUsers } = useContext(SocketContext);
  const { handleSearchedUserClick } = useContext(ChatContext);
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { isLoading, chats } = useFetchChats();
  const { user } = _getSecureLs("auth");
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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

  const handleLogout = () => {
    socket.emit("user:online");
    _remove("auth");
    navigate("/");
  };

  const handleProfileModelClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);

  return (
    <div className="side__nav">
      <Modal show={show} handleClose={handleClose} />
      <div className="side__nav__header">
        <h3>Chats</h3>
        <div className="side__nav__header__button__wrapper">
          <Button type="button" handleClick={handleShow}>
            Create Room
          </Button>
        </div>
      </div>

      <div className="tab-buttons">
        <button className={activeTab === 1 ? "active" : ""} onClick={() => handleTabClick(1)}>
          Recent Chats
        </button>
        <button className={activeTab === 2 ? "active" : ""} onClick={() => handleTabClick(2)}>
          Active Users
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <>
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
            {!showSearch ? (
              <div className="side__nav__users">
                {isLoading ? (
                  <ScaleLoader color="#0D6EFD" style={{ textAlign: "center" }} />
                ) : chats?.length > 0 ? (
                  chats?.map((chat) => {
                    let chatUserId = chat?.users[0]?._id;
                    let toggleUser = chat.users[0]?._id === user?._id ? 1 : 0;
                    let name = chat?.isGroupChat ? chat?.groupName : chat?.users[toggleUser]?.fullName;
                    let chatUser = !chat?.isGroupChat ? chat?.users[toggleUser] : null;
                    // console.log(chatUser, "chat user>>>>>>>");
                    return (
                      <NameInitials
                        key={chat?._id}
                        handleClick={() => {
                          // setSelectedChat(chat);
                          navigate(`chat/${chat?._id}`, {
                            state: {
                              name: name,
                              isGroupChat: chat?.isGroupChat,
                              userId: chatUserId,
                              chat: chat,
                              profile: chatUser?.profileUrl,
                            },
                          });
                        }}
                        name={name}
                        userId={user?._id}
                        // chatId={chat?._id}
                        chat={chat}
                        isHeading={true}
                        socket={socket}
                        profile={chatUser?.profileUrl}
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
                        handleSearchedUserClick(user?._id, user?.fullName, user?.profileUrl, user?.isGroupChat);
                        formik.values.search = "";
                        setShowSearch(false);
                      }}
                      name={user?.fullName}
                      profile={user?.profileUrl}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
        {activeTab === 2 && (
          <div className="tab-content__active__users">
            {activeUsers?.length > 0 ? (
              activeUsers?.map((user) => {
                return (
                  <div key={user?._id} className="avatar__online">
                    <NameInitials
                      handleClick={() => {
                        handleSearchedUserClick(user?._id, user?.fullName, user?.profileUrl, user?.isGroupChat);
                        formik.values.search = "";
                        setShowSearch(false);
                      }}
                      name={user?.fullName}
                      profile={user?.profileUrl}
                    />
                    <div className="avatar__online__dot"></div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>No Active Users</p>
            )}
          </div>
        )}
      </div>

      <div className="side__nav__loggedin__user">
        {showProfileModal && (
          <UploadProfileModal show={showProfileModal} handleProfileModal={handleProfileModelClose} userId={user?._id} />
        )}
        <div className="side__nav__avatar__wrapper">
          <NameInitials name={user?.fullName} profile={user?.profileUrl} handleClick={handleProfileModalShow} />
        </div>
        <span className="side__nav__logout__icon" onClick={handleLogout}>
          <MdLogout />
        </span>
      </div>
    </div>
  );
}

export default SideNav;
