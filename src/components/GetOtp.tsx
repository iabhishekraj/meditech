import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface ApiResponse {
  referenceId: string;
  error: boolean;
}

function GetOtp() {
  const [email, setEmail] = useState<string>("rai.abhishekraj@gmail.com");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(
      !event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostRequest = async () => {
    try {
      // throw new Error("error");
      const res = await axios.post<ApiResponse>(
        "http://13.200.137.232:8888/api/v1/auth/email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:5173/",
          },
          withCredentials: false,
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailError && email) {
      handlePostRequest();
      console.log("Get OTP for:", email);
    } else {
      setEmailError(true);
    }
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
            Get OTP in Email
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              required
              fullWidth
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" type="submit" color="primary">
              Get OTP
            </Button>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Something went wrong
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default GetOtp;
