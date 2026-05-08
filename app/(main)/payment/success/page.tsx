import { Suspense } from "react";
import { getDb } from "@/core/db/db";
import { payments } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, ArrowRight, Download, AlertCircle } from "lucide-react";

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

//   const db = await getDb();
//   const paymentRecord = await db.query.payments.findFirst({
//     where: eq(payments.tranId, transactionId),
//   });

//   if (!paymentRecord || paymentRecord.status !== "Paid") {
//     return (
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-red-50">
//         <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
//           <AlertCircle className="w-10 h-10 text-red-600" />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">
//           পেমেন্ট পেন্ডিং বা ফেইল্ড
//         </h1>
//         <p className="text-gray-500 mb-8">
//           আমরা আপনার পেমেন্টটি এখনও ভেরিফাই করতে পারিনি। ট্রানজেকশনটি সফল হয়ে
//           থাকলে কিছুক্ষণ পর আবার চেক করুন।
//         </p>
//         <Link
//           href="/"
//           className="inline-flex items-center text-indigo-600 font-semibold hover:underline"
//         >
//           হোমপেজে ফিরে যান <ArrowRight className="ml-2 w-4 h-4" />
//         </Link>
//       </div>
//     );
//   }

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-10 text-center border border-gray-100">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20"></div>
        <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
      </div>

      <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
        পেমেন্ট সফল!
      </h1>
      <p className="text-gray-500 mb-8 px-4">
        আপনার ট্রানজেকশনটি সম্পন্ন হয়েছে। কনফার্মেশন ডিটেইলস নিচে দেওয়া হলো।
      </p>

      <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left space-y-4 border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">ট্রানজেকশন আইডি</span>
          <span className="font-mono font-bold text-indigo-600 text-sm">
            {transactionId}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200/50">
          <span className="text-gray-400 text-sm">পরিমাণ</span>
          <span className="font-extrabold text-gray-900">
            {500} BDT
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200/50">
          <span className="text-gray-400 text-sm">সেগমেন্ট</span>
          <span className="font-bold text-gray-800">
            {"General"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-200"
        >
          ড্যাশবোর্ডে প্রবেশ করুন
        </Link>
        <button className="flex items-center justify-center w-full py-4 bg-white text-gray-600 border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
          <Download className="mr-2 w-4 h-4" /> রিসিপ্ট ডাউনলোড
        </button>
      </div>
    </div>
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
