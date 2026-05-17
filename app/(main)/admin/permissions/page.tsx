"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all features",
    permissions: ["read", "write", "delete", "manage_users", "manage_events"],
  },
  {
    id: 2,
    name: "Moderator",
    description: "Can manage events and moderate users",
    permissions: ["read", "write", "moderate"],
  },
  {
    id: 3,
    name: "User",
    description: "Basic user access",
    permissions: ["read", "register_events"],
  },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage roles and permissions</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus size={18} className="mr-2" />
          Add Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="p-4 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Permissions:</p>
              <div className="space-y-2">
                {role.permissions.map((perm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm p-2 bg-muted rounded"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {perm}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
