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

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setServerError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/register", values);
      dispatch(setCredentials(res.data.data));
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed.");
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
        <Typography variant="h5" gutterBottom>
          Create your EcoSphere account
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
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
            {loading ? <CircularProgress size={22} color="inherit" /> : "Create account"}
          </Button>
        </form>

        <Typography variant="body2" mt={3} textAlign="center">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
