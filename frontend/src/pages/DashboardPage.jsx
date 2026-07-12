import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axiosClient from "../api/axiosClient";
import StatCard from "../components/StatCard";

const PILLAR_COLORS = ["#2F5233", "#C97B4A", "#4C7A52", "#B3452C", "#5B6B5D"];

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("/dashboard/summary")
      .then((res) => setSummary(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const wasteChartData = (summary.environmental.wasteByType || []).map((w) => ({
    name: w.type,
    value: w._sum.quantity || 0,
  }));

  const goalsBarData = [
    { name: "Completed", value: summary.goals.completed },
    { name: "In Progress", value: summary.goals.total - summary.goals.completed },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ESG Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        A single view of your organization's environmental, social, and governance performance.
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="ESG Score" value={summary.esgScore} accent="primary.main" sublabel="out of 100" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total CO2e"
            value={`${summary.environmental.totalCo2Equivalent.toFixed(1)} kg`}
            sublabel={`${summary.environmental.carbonEntries} entries logged`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Energy Consumption"
            value={`${summary.environmental.totalEnergyConsumption.toFixed(1)} kWh`}
            sublabel={`${summary.environmental.energyEntries} entries logged`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Water Consumption"
            value={`${summary.environmental.totalWaterConsumption.toFixed(1)} L`}
            sublabel={`${summary.environmental.waterEntries} entries logged`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Suppliers Tracked" value={summary.governance.supplierCount} accent="secondary.main" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Avg. Supplier ESG Score"
            value={summary.governance.avgSupplierEsgScore.toFixed(1)}
            accent="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Goal Progress"
            value={`${summary.goals.avgProgressPercent}%`}
            sublabel={`${summary.goals.completed} of ${summary.goals.total} completed`}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: 340 }}>
            <Typography variant="subtitle1" gutterBottom>
              Waste by Type
            </Typography>
            {wasteChartData.length === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="80%">
                <Typography color="text.secondary">No waste entries logged yet</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie data={wasteChartData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {wasteChartData.map((entry, i) => (
                      <Cell key={entry.name} fill={PILLAR_COLORS[i % PILLAR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: 340 }}>
            <Typography variant="subtitle1" gutterBottom>
              Goals: Completed vs In Progress
            </Typography>
            {summary.goals.total === 0 ? (
              <Box display="flex" alignItems="center" justifyContent="center" height="80%">
                <Typography color="text.secondary">No goals created yet</Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={goalsBarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2F5233" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
