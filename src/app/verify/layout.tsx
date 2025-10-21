export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen m-0 p-0">
      <div className="min-h-screen">{children}</div>
    </div>
  )
}
