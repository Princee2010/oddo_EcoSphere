import { Paper, Typography, Box } from "@mui/material";

export default function StatCard({ label, value, sublabel, accent = "primary.main" }) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, height: "100%" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Box display="flex" alignItems="baseline" gap={1} mt={0.5}>
        <Typography variant="h4" sx={{ color: accent }}>
          {value}
        </Typography>
      </Box>
      {sublabel && (
        <Typography variant="caption" color="text.secondary">
          {sublabel}
        </Typography>
      )}
    </Paper>
  );
}
