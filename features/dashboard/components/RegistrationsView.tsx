import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Hash,
  MapPin,
  Trophy,
  XCircle,
} from "lucide-react";
import { PaymentStatus, Registration } from "../Types";

export const RegistrationsView = ({
  registrations,
}: {
  registrations: Registration[];
}) => {
  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 mr-1" />;
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600 mr-1" />;
      case "PENDING":
        return <AlertCircle className="h-4 w-4 text-amber-600 mr-1" />;
      default:
        return null;
    }
  };

  if (registrations.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No Registrations"
        description="You haven't registered for any segments yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {registrations.map((reg) => (
        <Card
          key={reg.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side: Segment Info */}
            <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="outline" className="mb-2 bg-slate-50">
                    {reg.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-indigo-500" />
                    {reg.segment.title}
                  </h3>
                </div>
                <Badge
                  variant={
                    reg.selectionStatus === "PENDING" ? "warning" : "success"
                  }
                >
                  {reg.selectionStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {reg.segment.venue}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {reg.segment.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {reg.segment.time}
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" /> {reg.trackingNumber}
                </div>
              </div>
            </div>

            {/* Right side: Payment & Team Info */}
            <div className="p-6 md:w-80 bg-slate-50 flex flex-col justify-center space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Team Details
                </p>
                <p className="font-medium text-slate-900">
                  {reg.team.teamName}
                </p>
                <p className="text-sm text-slate-500">{reg.team.teamCode}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Payment Status
                </p>
                {reg.payments.length > 0 ? (
                  reg.payments.map((payment, idx) => (
                    <div key={idx} className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          ৳{payment.paidAmount}
                        </span>
                        <Badge
                          variant={
                            payment.status === "SUCCESS"
                              ? "success"
                              : payment.status === "FAILED"
                                ? "destructive"
                                : "warning"
                          }
                          className="flex items-center bg-white border"
                        >
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">
                        Method: {payment.paymentMethod} • TxID:{" "}
                        {payment.transactionId}
                      </p>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">
                    No payment data
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
    <div className="p-4 bg-white rounded-full shadow-sm mb-4">
      <Icon className="h-8 w-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="text-slate-500 mt-1 max-w-sm">{description}</p>
  </div>
);
