import { useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  MenuItem, // Added MenuItem for proper select component rendering
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const API_URL = "http://127.0.0.1:8000/api/addresses/";

// Sorted stateCityMap alphabetically by state
const stateCityMap = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Itanagar", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sarangarh-Bilaigarh", "Sakti", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  };

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  whatsapp: Yup.string().required("WhatsApp number is required"),
  houseNo: Yup.string().required("House No is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  village: Yup.string().required("Village is required"),
  pinCode: Yup.string().required("PIN Code is required"),
  default: Yup.boolean(),
});

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("access");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // 👈 live validation
    defaultValues: {
      type: "",
      username: "",
      email: "",
      whatsapp: "",
      houseNo: "",
      state: "",
      city: "",
      village: "",
      pinCode: "",
      default: false,
    },
  });

  const watchState = watch("state");

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      showSnackbar("Failed to fetch addresses", "error");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editId) {
        const response = await axios.put(`${API_URL}${editId}/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSnackbar("Address updated successfully");
      } else {
        const response = await axios.post(API_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        showSnackbar("Address added successfully");
      }
      fetchAddresses();
      handleCloseDialog();
    } catch (err) {
      showSnackbar("Failed to submit address", "error");
    }
  };

  const handleEdit = (address) => {
    Object.entries(address).forEach(([key, value]) => setValue(key, value));
    setEditId(address.id);
    setOpenEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const target = addresses.find((addr) => addr.id === id);
      if (target.default) {
        showSnackbar("Cannot delete default address", "warning");
        return;
      }
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
      showSnackbar("Address deleted");
    } catch (err) {
      showSnackbar("Failed to delete address", "error");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await axios.patch(
        `${API_URL}set_default/`,
        { new_default_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAddresses();
      showSnackbar("Default address updated successfully");
    } catch (err) {
      showSnackbar("Failed to update default address", "error");
    }
  };

  const handleCloseDialog = () => {
    reset();
    setEditId(null);
    setOpenEditModal(false);
    setOpenAddModal(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Saved Addresses
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={() => setOpenAddModal(true)}
        >
          Add New
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} key={address.id}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: address.default ? "primary.main" : "divider",
                borderWidth: address.default ? 2 : 1,
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography fontWeight={600}>{address.type}</Typography>
                  {address.default && (
                    <Chip
                      label="Default"
                      size="small"
                      color="primary"
                      sx={{ height: 20 }}
                    />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  whiteSpace="pre-line"
                  sx={{ mb: 1 }}
                >
                  {`Name: ${address.username}\nEmail: ${address.email}\nWhatsApp: ${address.whatsapp}\n${address.houseNo}, ${address.village}, ${address.city}, ${address.state}\nPIN: ${address.pinCode}`}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(address)}
                    startIcon={<Edit fontSize="small" />}
                  >
                    Edit
                  </Button>
                  {!address.default && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(address.id)}
                    startIcon={<Delete fontSize="small" />}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog
        open={openEditModal || openAddModal}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editId ? "Edit Address" : "Add New Address"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column" sx={{ mt: 1 }}>
              {[
                {
                  name: "type",
                  label: "Type",
                  select: true,
                  options: ["Home", "Work", "Other"],
                },
                { name: "username", label: "Username" },
                { name: "email", label: "Email", type: "email" },
                { name: "whatsapp", label: "WhatsApp", type: "tel" },
                { name: "houseNo", label: "House No" },
                {
                  name: "state",
                  label: "State",
                  select: true,
                  options: Object.keys(stateCityMap).sort(), // Sorted states
                },
                {
                  name: "city",
                  label: "City",
                  select: true,
                  options: stateCityMap[watchState] ? stateCityMap[watchState].sort() : [], // Sorted cities
                },
                { name: "village", label: "Village" },
                { name: "pinCode", label: "PIN Code", type: "tel" },
              ].map(({ name, label, type = "text", select, options }) => (
                <Grid item xs={12} key={name}>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select={!!select}
                        fullWidth
                        margin="dense"
                        label={label}
                        type={type}
                        // Removed SelectProps={{ native: true }} to use Material-UI's native select for better styling
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          if (name === "state") setValue("city", ""); // Clear city when state changes
                        }}
                      >
                        {select && (
                          // Added an empty MenuItem for placeholder/default selection
                          <MenuItem value="">
                            <em>Select a {label}</em>
                          </MenuItem>
                        )}
                        {select &&
                          options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Controller
                  name="default"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Set as default address"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    {editId ? "Save Changes" : "Add Address"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Addresses;