import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Alessandro | Desenvolvedor FullStack Pleno",
	description:
		"Olá! Meu nome é Alessandro Henrique Ramos e sou Desenvolvedor FullStack Pleno com experiência em TypeScript, React e Node.js.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={inter.className}>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
