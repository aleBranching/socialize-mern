import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useEffect } from "react";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const { _id, picturePath } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("the unique key prop is a MUI library bug");
  });
  return (
    <Box>
      <Navbar></Navbar>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "26%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}></MyPostWidget>
          <PostsWidget userId={_id}></PostsWidget>
        </Box>

        {isNonMobileScreen && (
          <Box flexBasis="26%">
            {/* <AdvertWidget></AdvertWidget> */}
            <Box m="2rem 0" />
            <FriendListWidget userId={_id}></FriendListWidget>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
