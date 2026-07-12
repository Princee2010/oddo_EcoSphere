import { AppBar, Toolbar, Typography, Box, Button, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

export default function Topbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
        <Box textAlign="right">
          <Typography variant="body2" fontWeight={600}>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: "primary.main" }}>{user?.name?.[0]?.toUpperCase() || "U"}</Avatar>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
