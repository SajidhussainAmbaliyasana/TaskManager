"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LoginForm = () => {
  return (
    <Card
      sx={{
        bgcolor: "#1E293B",
        border: "1px solid #334155",
        borderRadius: 4,
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <CardContent sx={{ p: 5 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="white"
          gutterBottom
        >
          Welcome Back
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            mb: 4,
          }}
        >
          Sign in to continue managing your tasks.
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Email"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />

            <Link
              href="#"
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
          >
            Login
          </Button>

          <Typography
            textAlign="center"
            color="text.secondary"
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              underline="hover"
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginForm;