import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface ApiResponse {
  referenceId: string;
  otp: string;
  password: string;
}

function ValidateEmail() {
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<boolean>(false);

  const handlePostRequest = async () => {
    try {
      const res = await axios.post<ApiResponse>(
        "http://13.200.137.232:8888/api/v1/auth/email/validate",
        { referenceId: "", otp, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setResponse(res.data);
      } else {
        throw new Error("Unexpected error!");
      }
    } catch (error) {
      console.log("error ", error);
      setOpen(true);
    }
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
    setOtpError(!event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // if (!emailError && email) {
    //   handlePostRequest();
    //   console.log("Get OTP for:", email);
    // } else {
    //   setEmailError(true);
    // }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          border={0}
          borderRadius={8}
          boxShadow={4}
        >
          <Typography
            color={"primary"}
            sx={{ marginBottom: 2 }}
            variant="h5"
            component="h5"
            gutterBottom
          >
            Welcome to MediTech
          </Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="h6"
            component="h6"
            gutterBottom
          >
            Login to the app
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              error={otpError}
              onChange={handleOtpChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default ValidateEmail;
