import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
// import PostWidget from "scenes/widgets/PostWisget";
import PostWidget from "scenes/widgets/PostWisget";
import OtherUserWidget from "scenes/widgets/OtherUserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line

  if (!user) return null;

  return (
    <Box>
      <Navbar></Navbar>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <OtherUserWidget
            userId={userId}
            picturePath={user.picturePath}
          ></OtherUserWidget>
          <Box m="2rem 0"></Box>
          <FriendListWidget
            userId={userId}
            otherProfile={true}
          ></FriendListWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "26%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={user.picturePath}></MyPostWidget> */}
          <Box m="2rem 0"></Box>

          <PostsWidget userId={userId} isProfile={true}></PostsWidget>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
