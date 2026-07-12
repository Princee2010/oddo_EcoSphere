import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import Co2Icon from "@mui/icons-material/Co2";
import BoltIcon from "@mui/icons-material/Bolt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InsightsIcon from "@mui/icons-material/Insights";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import logo from "../assets/logo.png";

const features = [
  { icon: <Co2Icon />, label: "Carbon Emissions", desc: "Log activity data and track CO2e output by source." },
  { icon: <BoltIcon />, label: "Energy Consumption", desc: "Monitor consumption and cost across energy sources." },
  { icon: <WaterDropIcon />, label: "Water Consumption", desc: "Track usage, cost, and conservation efforts." },
  { icon: <DeleteSweepIcon />, label: "Waste Management", desc: "Break down waste by type, landfill vs. diverted." },
  { icon: <GroupsIcon />, label: "Suppliers", desc: "Screen and score suppliers on ESG criteria." },
  { icon: <FlagIcon />, label: "ESG Goals", desc: "Set targets across environmental, social, governance pillars." },
  { icon: <FactCheckIcon />, label: "Audits", desc: "Schedule and record internal, external, and regulatory audits." },
  { icon: <InsightsIcon />, label: "Insights Dashboard", desc: "One view of ESG score, trends, and progress over time." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      {/* Top bar */}
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" justifyContent="space-between" py={3}>
          <Box component="img" src={logo} alt="EcoSphere" sx={{ height: 48 }} />
          <Button variant="contained" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </Box>
      </Container>

      {/* Hero */}
      <Container maxWidth="md">
        <Box textAlign="center" py={{ xs: 4, md: 8 }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            One platform for your entire ESG picture
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={400} mb={4}>
            EcoSphere brings carbon, energy, water, waste, suppliers, goals, and audits
            into a single dashboard — so sustainability reporting stops living in
            scattered spreadsheets.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/login")}
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>

      {/* Problem */}
      <Container maxWidth="md">
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, mb: 6 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            The problem
          </Typography>
          <Typography color="text.secondary" paragraph>
            Most organizations track environmental and governance data across
            disconnected spreadsheets, emails, and one-off reports from different
            teams — facilities logs energy bills, procurement tracks suppliers
            separately, and sustainability teams piece together CO2e estimates by
            hand. There's no single source of truth, numbers go stale between
            reporting cycles, and preparing for an audit or investor disclosure
            means chasing down data from five different owners.
          </Typography>
          <Typography color="text.secondary">
            The result: reporting is slow, error-prone, hard to trust, and nearly
            impossible to track trends on — so it's difficult to know whether
            sustainability goals are actually being met until it's too late to
            act on them.
          </Typography>
        </Paper>
      </Container>

      {/* What EcoSphere does */}
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            What EcoSphere does
          </Typography>
          <Typography color="text.secondary">
            A single, user-scoped system of record for every ESG data point that matters.
          </Typography>
        </Box>

        <Grid container spacing={2} mb={6}>
          {features.map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.label}>
              <Paper
                variant="outlined"
                sx={{ p: 2.5, height: "100%", display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box color="primary.main">{f.icon}</Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {f.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Insights */}
      <Container maxWidth="md">
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, mb: 6 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            What you get
          </Typography>
          <Stack spacing={1.5} mt={2}>
            <Typography color="text.secondary">
              • A live ESG score calculated from goal progress and supplier ratings,
              instead of a number recalculated by hand once a quarter.
            </Typography>
            <Typography color="text.secondary">
              • A resource usage trend chart across carbon, energy, water, and
              waste, so you can see whether consumption is trending up or down
              month over month.
            </Typography>
            <Typography color="text.secondary">
              • A breakdown of waste by type and goal completion status at a glance,
              without opening a spreadsheet.
            </Typography>
            <Typography color="text.secondary">
              • One login, one place to add, edit, or delete records across every
              category — each user only ever sees their own organization's data.
            </Typography>
          </Stack>
        </Paper>
      </Container>

      {/* Final CTA */}
      <Container maxWidth="md">
        <Box textAlign="center" pb={8}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Ready to see your ESG data in one place?
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/login")}
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}