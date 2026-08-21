import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/navbar/navbar";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="">{children} </div>
      <Footer />
    </div>
  );
}
