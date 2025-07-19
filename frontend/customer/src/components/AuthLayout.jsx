import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LoginForm from "../components/login";
import SignupForm from "../components/Signup";
import "../pages/AuthForm.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AuthLayout() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-image d-none d-md-block">
          <img
            src="./src/assets/Images/login.png"
            alt="Illustration"
            className="img-fluid"
            style={{ maxWidth: "400px", height: "auto" }}
          />
        </div>

        <div className="auth-card">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="auth tabs"
          >
            <Tab label="Login" id="auth-tab-0" />
            <Tab label="Sign Up" id="auth-tab-1" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <LoginForm />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <SignupForm />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
