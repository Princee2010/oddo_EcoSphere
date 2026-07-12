import { NavLink } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import Co2Icon from "@mui/icons-material/Co2";
import BoltIcon from "@mui/icons-material/Bolt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";
import logo from "../assets/logo.png";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Carbon", path: "/carbon", icon: <Co2Icon /> },
  { label: "Energy", path: "/energy", icon: <BoltIcon /> },
  { label: "Water", path: "/water", icon: <WaterDropIcon /> },
  { label: "Waste", path: "/waste", icon: <DeleteSweepIcon /> },
  { label: "Suppliers", path: "/suppliers", icon: <GroupsIcon /> },
  { label: "Goals", path: "/goals", icon: <FlagIcon /> },
  { label: "Audits", path: "/audits", icon: <FactCheckIcon /> },
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
        <Box component="img" src={logo} alt="EcoSphere" sx={{ width: "100%", maxWidth: 190, display: "block" }} />
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