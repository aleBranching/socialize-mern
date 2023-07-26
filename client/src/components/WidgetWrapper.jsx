import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1rem",
  boxShadow: `${
    theme.palette.mode === "dark"
      ? // ? `box-shadow: 10px 4px 5px ${theme.palette.primary};`
        // `10px 4px 5px ${theme.palette.primary};`
        `0 4px 6px -1px  ${theme.palette.primary.main}, 0 2px 4px -2px ${theme.palette.accent.main}`
      : // : `0 20px 25px -5px ${theme.palette.secondary.dark}, 0 8px 10px -6px rgb(0 0 0 / 0.1)`
        `0 20px 25px -5px ${theme.palette.secondary.dark}, 0 8px 10px -6px ${theme.palette.secondary.dark}`
  }`,
  // `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
  // border: `4px solid ${theme.palette.secondary.dark}`,
}));

export default WidgetWrapper;
