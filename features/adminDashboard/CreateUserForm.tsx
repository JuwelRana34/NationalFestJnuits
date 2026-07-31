"use client";

import { Loader2, Shield, UserPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createAdminUserAction } from "./action/admin-users.action";
import { CreateUserInput } from "./admin.schema";

export default function CreateUserForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<CreateUserInput>({
    name: "",
    email: "",
    role: "MODERATOR",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await createAdminUserAction(formData);
        
         console.log(
           "Result from createAdminUserAction:",
           result,
         );

        if (result.success) {
          toast.success(result.message);
          // Form reset korar logic
          setFormData({ name: "", email: "", role: "MODERATOR", password: "" });
        }else {
          toast.error("An unexpected error occurred. please try again with valid data.");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
          <Shield size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Create New User</h2>
          <p className="text-sm text-slate-400">
            Add a new admin or moderator to the dashboard
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="json Turnker"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="admin@fest.com"
          />
        </div>

        {/* Grid for Role & Password */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "USER" | "MODERATOR" | "ADMIN",
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
            >
              <option value="USER">General User</option>
              <option value="MODERATOR">Moderator</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Temporary Password
            </label>
            <input
              type="text"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Min 6 chars"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Creating User...
            </>
          ) : (
            <>
              <UserPlus size={20} />
              Create Account
            </>
          )}
        </button>
      </form>
    </div>
  );
}
