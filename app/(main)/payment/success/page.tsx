import { redirect } from "next/navigation";
import { Suspense } from "react";
import SuccessBody from "../_Components/SuccessBody";
// import { revalidateTag } from "next/cache";

// ১. পেমেন্ট ডিটেইলস কম্পোনেন্ট (Data Fetching Component)
async function PaymentDetails({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const transactionId = resolvedParams.tran_id as string;

  if (!transactionId) {
    redirect("/");
  }

  //  revalidateTag("events","max");
  return (
    <>
      <SuccessBody transactionId={transactionId || ""} />
    </>
  );
}

// ২. মেইন পেজ কম্পোনেন্ট (Layout & Suspense Boundary)
export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen pt-20  bg-slate-800 flex flex-col items-center justify-center p-6">
      <Suspense fallback={<PaymentSkeleton />}>
        <PaymentDetails searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// ৩. লোডিং স্ট্যাটাস (Skeleton UI)
function PaymentSkeleton() {
  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-8"></div>
      <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-100 rounded-lg w-1/2 mx-auto mb-10"></div>
      <div className="space-y-4 mb-8">
        <div className="h-16 bg-gray-50 rounded-2xl"></div>
      </div>
      <div className="h-14 bg-gray-200 rounded-2xl"></div>
    </div>
  );
}
