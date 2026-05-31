import ReduxProvider from "@/redux/Provider";
//import AppThemeProvider from "@/theme/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <AppThemeProvider> */}
            {children}
          {/* </AppThemeProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}