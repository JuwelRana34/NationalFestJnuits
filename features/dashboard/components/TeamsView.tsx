import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Team } from "../Types";
import { EmptyState } from "./RegistrationsView";

export const TeamsView = ({ teams }: { teams: Team[] }) => {
  if (teams.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Teams Found"
        description="You are not part of any teams yet."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {teams.map((team) => (
        <Card key={team.id} className="h-full flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-indigo-950">
                  {team.teamName}
                </CardTitle>
                <p className="text-sm text-slate-500 mt-1 font-mono">
                  {team.teamCode}
                </p>
              </div>
              <Badge variant="outline" className="bg-white">
                {team.segment.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <ul className="divide-y divide-slate-100">
              {team.members.map((member, idx) => (
                <li
                  key={idx}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">
                      {member.institution} • {member.phone}
                    </p>
                  </div>
                  {member.isLeader && (
                    <Badge
                      variant="default"
                      className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100"
                    >
                      Leader
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
