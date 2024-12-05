import { styled } from "@mui/material/styles";

export const drawerWidth = 340;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

import Drawer from "@mui/material/Drawer";

export const CustomDrawer = ({ children, open }) => {
  return (
    <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              top: '200px',
              overflowY: 'auto',
              border: 'none',
              ml: 5,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {children}
        </Drawer>
  );
}
