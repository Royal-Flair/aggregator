import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import CartProvider from "./components/Commerce/context/Context";

const inter = Inter({ subsets: ["latin"] });

async function getData(userId: string) {
  noStore();
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const APP_NAME = 'Nordkurve';
  const APP_DESCRIPTION = 'Bayer 04 Ultras';

  return (
    <html lang="en">
      <body className={`${inter.className} ${data?.colorScheme ?? "theme-zinc"}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
