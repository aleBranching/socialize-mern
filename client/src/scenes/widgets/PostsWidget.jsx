import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWisget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (isProfile) {
      getUserPost(userId);
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line
  const getPosts = async () => {
    const request = await fetch(`${process.env.REACT_APP_SERVER_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();

    dispatch(setPosts({ posts: response }));
  };

  const getUserPost = async (userId) => {
    const request = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${userId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await request.json();

    dispatch(setPosts({ posts: response }));
  };

  return (
    <>
      {posts.map(
        ({
          comments,
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
        }) => (
          <PostWidget
            key={_id}
            comments={comments}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
          ></PostWidget>
        )
      )}
    </>
  );
};

export default PostsWidget;
