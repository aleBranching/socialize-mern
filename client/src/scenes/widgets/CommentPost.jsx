// import { Button } from "@mui/base";
import { InputBase, Button, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";

const CommentPost = () => {
  let [currentText, setCurrentText] = useState("");
  let { palette } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentText("");
    console.log(currentText);
    // Handle a post request
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputBase
        placeholder="Make a comment..."
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
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
    </form>
  );
};

export default CommentPost;
