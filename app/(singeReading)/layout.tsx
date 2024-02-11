export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="max-w-screen-md mx-auto p-4">{children}</div>
  );
}
