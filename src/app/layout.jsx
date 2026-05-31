import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeRegistry from "@/components/common/ThemeRegistry";
import ReduxProvider from "@/redux/Provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TaskFlow — Modern Task Management",
  description: "A premium SaaS task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        style={{
          margin: 0,
          backgroundColor: "#0F172A",
        }}
      >
        <AppRouterCacheProvider>
          <ReduxProvider>
            <ThemeRegistry>
              <Toaster position="top-right" />
              {children}
            </ThemeRegistry>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}