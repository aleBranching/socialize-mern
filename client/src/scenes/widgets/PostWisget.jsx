import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
// import PostsWidget from "./PostsWidget";

const PostWidget = ({
  comments,
  postId,
  userId,
  name,
  location,
  description,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const token = useSelector((state) => state.token);

  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const upadatedPost = await response.json();
    dispatch(setPost({ post: upadatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={userId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      ></Friend>

      <Typography color={main} sx={{ mt: "1rem" }}>
        {" "}
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
          }}
          src={`${process.env.REACT_APP_SERVER_URL}assets/${picturePath}`}
        ></img>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }}></FavoriteOutlined>
              ) : (
                <FavoriteBorderOutlined></FavoriteBorderOutlined>
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined></ChatBubbleOutlineOutlined>
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined></ShareOutlined>
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider></Divider>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}

          <Divider></Divider>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
