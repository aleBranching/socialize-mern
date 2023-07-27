import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId, otherProfile = false }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const theme = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);

  const getFriends = async () => {
    const request = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await request.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    console.log("THE FRIENDS");
    getFriends();
    console.log(friends);
  }, []); //eslint-disable-line

  const primaryLigth = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const accent = palette.accent.main;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        varian="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friends) ? (
          friends.map((aFriend) => (
            <Friend
              key={aFriend._id}
              friendId={aFriend._id}
              name={`${aFriend.firstName} ${aFriend.lastName}`}
              subtitle={aFriend.occupation}
              userPicturePath={aFriend.picturePath}
              otherProfile={otherProfile}
            ></Friend>
          ))
        ) : (
          <Typography variant="h4">
            {" "}
            Error occured fetching friend list
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
    // <WidgetWrapper>
    //   <Typography
    //     color={palette.neutral.dark}
    //     varian="h5"
    //     fontWeight="500"
    //     sx={{ mb: "1.5rem" }}
    //   >
    //     Friends List
    //   </Typography>
    //   <Box display="flex" flexDirection="column" gap="1.5rem">
    //     {friends === Array ? (
    //       friends.map((aFriend) => (
    //         <Friend
    //           key={aFriend._id}
    //           friendId={aFriend._id}
    //           name={`${aFriend.firstName} ${aFriend.lastName}`}
    //           subtitle={aFriend.occupation}
    //           userPicturePath={aFriend.picturePath}
    //           otherProfile={otherProfile}
    //         ></Friend>
    //       ))
    //     ) : (
    //       <Typography variant="h4">
    //         {" "}
    //         Error occured fetching friend list
    //       </Typography>
    //     )}
    //   </Box>
    // </WidgetWrapper>
  );
};

export default FriendListWidget;
