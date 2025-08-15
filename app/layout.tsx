'use client'
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import AuthProvider from "./components/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {
                // Silent error handling
              }
            `,
          }}
        />
      </head>
      <body 
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`} 
        suppressHydrationWarning
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="light" 
              enableSystem={false}
              disableTransitionOnChange
              storageKey="theme"
            >
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}