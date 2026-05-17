"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Moderator", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage all users in your platform</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      <Card className="p-4 md:p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              placeholder="Search users..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Email</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Role</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-sm">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4 text-sm">{user.role}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
