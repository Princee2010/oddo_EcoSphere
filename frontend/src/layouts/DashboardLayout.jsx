import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} minHeight="100vh" bgcolor="background.default">
        <Topbar />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
