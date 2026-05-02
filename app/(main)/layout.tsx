import Navbar from "@/components/custom/navbar";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <div className="">{children} </div>
    </div>
  );
}
