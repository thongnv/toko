export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}