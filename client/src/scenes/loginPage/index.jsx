import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Form from "./Form";
// import limeSVG from "../../../public/assets/lime.svg";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px )");
  // const navigate = useNavigate();

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;

  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <Box>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="1rem"
        backgroundColor={alt}
        p="1rem 6%"
        textAlign="center"
      >
        <img src="../assets/lime.svg" height="30rem"></img>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
        >
          socialize-mern
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          Welcome to Sociopedia, the Social Media for odd people!
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
};

export default LoginPage;
