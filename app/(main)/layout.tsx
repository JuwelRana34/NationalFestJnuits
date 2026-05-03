import Navbar from "@/components/custom/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />

      <div className="">{children} </div>
    </div>
  );
}
