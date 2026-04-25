
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, CreditCard, Trophy } from "lucide-react";

const registeredSegments = [
  {
    id: 1,
    name: "Competitive Programming",
    teamName: "Runtime_Terrors",
    status: "Approved",
    payment: "Paid",
  },
  {
    id: 2,
    name: "Project Showcasing",
    teamName: "Innovators",
    status: "Pending",
    payment: "Unpaid",
  },
];

// --- Sub-components --

export default function RegisteredEventsCard() {
  return (
    <Card className=" bg-slate-700 border-white shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl font-serif  flex items-center text-amber-400 gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          My Segments
        </CardTitle>
        <CardDescription className="text-slate-300">
          Events you have registered for the National IT Fest 2026.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {registeredSegments.map((segment) => (
          <div
            key={segment.id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-4  rounded-lg bg-slate-800 "
          >
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold text-slate-300">{segment.name}</h4>
              <p className="text-sm  mt-1">
                Team:{" "}
                <span className="font-medium text-slate-300">
                  {segment.teamName}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={
                  segment.status === "Approved" ? "default" : "secondary"
                }
                className={
                  segment.status === "Approved"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : ""
                }
              >
                {segment.status === "Approved" && (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                )}
                {segment.status}
              </Badge>

              <Badge
                variant="outline"
                className={
                  segment.payment === "Paid"
                    ? "border-secondary text-secondary"
                    : "border-secondary text-secondary"
                }
              >
                {segment.payment === "Paid" ? "Paid" : "Payment Due"}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="bg-transparent border-t border-slate-400 p-4 rounded-b-lg">
        <div className="w-full flex items-center justify-between">
          <span className="text-sm text-slate-300 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-secondary" /> Need to clear
            dues?
          </span>
          <Button className="bg-secondary text-white hover:bg-amber-600 font-semibold">
            Pay Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
