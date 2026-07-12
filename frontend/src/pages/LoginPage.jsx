import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import axiosClient from "../api/axiosClient";
import { setCredentials } from "../store/authSlice";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setServerError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/login", values);
      dispatch(setCredentials(res.data.data));
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Paper variant="outlined" sx={{ p: 4, width: 380 }}>
        <Box component="img" src={logo} alt="EcoSphere" sx={{ width: "100%", maxWidth: 220, display: "block", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Sign in to EcoSphere
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Track your organization's environmental, social, and governance performance.
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Sign in"}
          </Button>
        </form>

        <Typography variant="body2" mt={3} textAlign="center">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register">
            Create one
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}