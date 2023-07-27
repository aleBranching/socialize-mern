// import { Button } from "@mui/base";
import {
  InputBase,
  Button,
  useTheme,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const CommentPost = ({ postId, loggedInUserId }) => {
  let dispatch = useDispatch();

  let [currentText, setCurrentText] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let { palette } = useTheme();
  let token = useSelector((state) => state.token);
  let [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setCurrentText("");

      const commentsResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${loggedInUserId}/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: currentText,
          }),
        }
      );

      const commentResponseJSON = await commentsResponse.json();
      if (commentsResponse.status === 409) {
        throw commentResponseJSON;
      }
      console.log(commentResponseJSON);

      //   dispatch(setPost({ post: commentResponseJSON }));
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
      //   await console.log("aaaa");
      //   console.log("aaaa");
      setOpen(true);
      //   console.log("the open variable", open);
    }
    // Handle a post request
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box display="flex" justifyContent="space-between">
        <InputBase
          placeholder="Make a comment..."
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          sx={{ flexGrow: "1" }}
        ></InputBase>
        <Button
          disabled={!currentText}
          // onClick={handlePost}
          type="submit"
          sx={{
            // color: palette.background.alt,
            color:
              palette.mode === "dark"
                ? palette.background.alt
                : palette.text.primary,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&.Mui-disabled": {
              color:
                palette.mode === "dark"
                  ? palette.primary.dark
                  : palette.primary.dark,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            },
          }}
        >
          POST
        </Button>
        <Snackbar open={open}>
          <Alert variant="filled" severity="error" onClose={handleClose}>
            Error alert: {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

export default CommentPost;
