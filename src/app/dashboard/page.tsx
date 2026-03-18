import Dashboard from "../components/dashboard";
import Navbar from "../components/navbar";

export default async function DashboardPage() {
// https://gash-foring-server.vercel.app
  //const res = await fetch("https://gash-foring-server.vercel.app/api/bookings")

  const res = await fetch("https://gash-foring-server.vercel.app/api/bookings", {
  cache: "no-store",
})
  const data = await res.json()

  return (
    <main>
      <Navbar />
      <Dashboard bookingsData={data} />
    </main>
  )
}
