import React, { useEffect } from "react";
import { Card, Avatar } from "antd";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom/globalState";
import { LogoutOutlined, PlayCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { getCurrentUser } from "../util/ApiUtil";
import "./Profile.css";

const { Meta } = Card;

const Profile = (props) => {
  const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      props.history.push("/login");
    }
    loadCurrentUser();
  }, []);

  const loadCurrentUser = () => {
    getCurrentUser()
      .then((response) => {
        setLoggedInUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/login");
  };

  const chat = () => {
    window.location.href = "/chat"
  }

  const album = () => {
    window.location.href = "/album"
  }

  return (
    <div className="profile-container">
      <h1 style={{ fontSize: "xx-large", textAlign: "center" }} className="saludo">¡Bienvenido {currentUser.username}!</h1>
      <Card
        style={{ width: 420, border: "1px solid #e1e0e0" }}
        actions={[<LogoutOutlined onClick={logout} />, <PlayCircleOutlined onClick={chat} />, <CloudUploadOutlined onClick={album} />]}
      >
        <Meta
          avatar={
            <Avatar
              src={currentUser.profilePicture}
              className="user-avatar-circle"
            />
          }
          title={currentUser.name}
          description={"@" + currentUser.username}
        />
      </Card>
      <br />
    </div>
  );
};

export default Profile;
