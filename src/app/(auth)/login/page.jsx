import { Box, Container, Grid, Typography } from "@mui/material";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0F172A",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          alignItems="center"
        >
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                px: { xs: 0, md: 6 },
              }}
            >
              <Typography
                variant="h3"
                fontWeight={700}
                color="white"
                gutterBottom
              >
                TaskFlow
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#94A3B8",
                  mb: 5,
                  maxWidth: 500,
                }}
              >
                Organize your tasks, track progress, and stay productive with a
                modern task management experience.
              </Typography>

              {/* Illustration Placeholder */}
              <Box
                sx={{
                  height: 350,
                  borderRadius: 4,
                  bgcolor: "#1E293B",
                  border: "1px solid #334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: "6rem" }}
                >
                  🚀
                </Typography>
              </Box>

              <Typography
                sx={{
                  mt: 3,
                  color: "#64748B",
                }}
              >
                © 2026 TaskFlow. All rights reserved.
              </Typography>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}