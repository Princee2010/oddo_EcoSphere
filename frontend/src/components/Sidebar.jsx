import { NavLink } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import Co2Icon from "@mui/icons-material/Co2";
import BoltIcon from "@mui/icons-material/Bolt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Carbon", path: "/carbon", icon: <Co2Icon /> },
  { label: "Energy", path: "/energy", icon: <BoltIcon /> },
  { label: "Water", path: "/water", icon: <WaterDropIcon /> },
  { label: "Waste", path: "/waste", icon: <DeleteSweepIcon /> },
  { label: "Suppliers", path: "/suppliers", icon: <GroupsIcon /> },
  { label: "Goals", path: "/goals", icon: <FlagIcon /> },
];

export default function Sidebar() {
  return (
    <Box
      width={240}
      flexShrink={0}
      borderRight="1px solid"
      borderColor="divider"
      height="100vh"
      position="sticky"
      top={0}
      bgcolor="background.paper"
    >
      <Box p={2.5}>
        <Typography variant="h6" color="primary.dark" fontWeight={800}>
          EcoSphere
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ESG Management Platform
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              "&.active": {
                bgcolor: "primary.main",
                color: "#fff",
                "& .MuiListItemIcon-root": { color: "#fff" },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
