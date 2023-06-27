import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  otherProfile = false,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);

  let isAllowedToPatch = () => {
    if (friendId == _id) {
      return false;
    }
    if (otherProfile) {
      return false;
    }
    return true;
  };
  const token = useSelector((state) => state.token);

  const primaryLigth = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = (() => {
    if (
      friends.length === 0 ||
      typeof friends.length === "string" ||
      typeof friends.length === "undefined"
    ) {
      return false;
    }

    return friends.find((aFriend) => aFriend._id === friendId);
  })();

  useEffect(() => {});

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();

    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween key={friendId}>
      <FlexBetween>
        <UserImage image={userPicturePath} size="55px" />
        <Box
          ml="1rem"
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {isAllowedToPatch() && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLigth, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined
              sx={{ color: primaryDark }}
            ></PersonRemoveOutlined>
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }}></PersonAddOutlined>
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
