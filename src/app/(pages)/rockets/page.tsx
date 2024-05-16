import Rocket from "@/components/Rocket";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";

export default async function Home() {
  return (
    <div>
        <Navbar />
        <div><Pagination /></div>
    </div>
  );
}