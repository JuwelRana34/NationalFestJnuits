"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Profile } from "../Types";

const API_URL = typeof window !== "undefined" ? window.location.origin :"http://localhost:8787";

interface ProfileEditDialogProps {
  profile: Profile;
  triggerVariant?: "default" | "alert";
}

export const ProfileEditDialog = ({
  profile,
  triggerVariant = "default",
}: ProfileEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    phone: profile?.phone && profile.phone !== "N/A" ? profile.phone : "",
    institution:
      profile?.institution && profile.institution !== "N/A"
        ? profile.institution
        : "",
    department:
      profile?.department && profile.department !== "N/A"
        ? profile.department
        : "",
    tShirtSize: profile?.tShirtSize || "L",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/users/update-profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Profile updated successfully!");
      // Optionally, you can add logic here to refresh the profile data on the page
    } else {
      alert("Failed to update profile. Please try again.");
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* FIX: DialogTrigger-এর সাথে asChild ব্যবহার করে কন্ডিশনাল বাটন রাখা হয়েছে */}
      {triggerVariant === "alert" ? (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="border-amber-300 text-amber-900 hover:bg-amber-100 bg-transparent dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950 flex items-center gap-2 self-start sm:self-center"
        >
          <Edit className="h-4 w-4" /> Update Now
        </Button>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" /> Edit Profile
        </Button>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                placeholder="e.g. Jagannath University"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g. CSE"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tShirtSize">T-Shirt Size</Label>
              <Input
                id="tShirtSize"
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleInputChange}
                placeholder="e.g. M, L, XL"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
