import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../api/axiosClient";

export default function ResourceTable({ config }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { control, handleSubmit, reset } = useForm({ defaultValues: {} });

  const notify = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(config.endpoint);
      setRows(res.data.data || []);
    } catch (err) {
      notify(err.response?.data?.message || "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, [config.endpoint]);

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.endpoint]);

  const openAddDialog = () => {
    setEditingRow(null);
    reset({});
    setDialogOpen(true);
  };

  const openEditDialog = (row) => {
    setEditingRow(row);
    const values = {};
    config.formFields.forEach((f) => {
      values[f.key] = f.type === "date" && row[f.key] ? row[f.key].slice(0, 10) : row[f.key];
    });
    reset(values);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const onSubmit = async (formValues) => {
    // Strip empty strings so optional numeric/date fields don't fail validation as ""
    const payload = Object.fromEntries(
      Object.entries(formValues).filter(([, v]) => v !== "" && v !== undefined)
    );

    try {
      if (editingRow) {
        await axiosClient.put(`${config.endpoint}/${editingRow.id}`, payload);
        notify(`${config.title} record updated`);
      } else {
        await axiosClient.post(config.endpoint, payload);
        notify(`${config.title} record created`);
      }
      setDialogOpen(false);
      fetchRows();
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      const message = apiErrors?.length
        ? apiErrors.map((e) => e.message).join(", ")
        : err.response?.data?.message || "Something went wrong";
      notify(message, "error");
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Delete this ${config.title.toLowerCase()} record? This can't be undone.`)) {
      return;
    }
    try {
      await axiosClient.delete(`${config.endpoint}/${row.id}`);
      notify(`${config.title} record deleted`);
      fetchRows();
    } catch (err) {
      notify(err.response?.data?.message || "Delete failed", "error");
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{config.title}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}>
          Add {config.title.slice(0, -1) || config.title}
        </Button>
      </Box>

      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {config.columns.map((col) => (
                  <TableCell key={col.key}>{col.label}</TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={config.columns.length + 1} align="center">
                    <CircularProgress size={24} sx={{ my: 2 }} />
                  </TableCell>
                </TableRow>
              )}

              {!loading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={config.columns.length + 1} align="center">
                    <Typography color="text.secondary" py={3}>
                      No records yet. Click "Add {config.title.slice(0, -1)}" to create the first one.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                rows.map((row) => (
                  <TableRow key={row.id} hover>
                    {config.columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.type === "date" && row[col.key]
                          ? new Date(row[col.key]).toLocaleDateString()
                          : String(row[col.key] ?? "")}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEditDialog(row)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {editingRow ? `Edit ${config.title.slice(0, -1)}` : `Add ${config.title.slice(0, -1)}`}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            {config.formFields.map((field) => (
              <Controller
                key={field.key}
                name={field.key}
                control={control}
                rules={{ required: field.required ? `${field.label} is required` : false }}
                render={({ field: rhfField, fieldState }) =>
                  field.type === "select" ? (
                    <TextField
                      {...rhfField}
                      select
                      label={field.label}
                      value={rhfField.value ?? ""}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    >
                      {field.options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      {...rhfField}
                      value={rhfField.value ?? ""}
                      type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                      label={field.label}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
                      fullWidth
                    />
                  )
                }
              />
            ))}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingRow ? "Save changes" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
