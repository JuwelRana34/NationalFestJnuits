import Navbar from "@/components/custom/navbar";

export default function layout({children}: { children: React.ReactNode }) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">{children} </div>
      </div>
    );
}