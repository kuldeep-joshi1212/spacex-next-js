import {redirect} from "next/navigation";
import Navbar from "@/components/Navbar";
import Rocket from "@/components/Rocket";
import Pagination from "@/components/Pagination";

export default function Home() {
  return (
  <>
    {/*{redirect("/rockets")}*/}
    <Navbar />
    <Pagination />
  </>
    );
}
