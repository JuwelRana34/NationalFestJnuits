"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage system settings and configuration</p>
      </div>

      {/* General Settings */}
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-6">General Settings</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="app-name" className="text-sm font-medium">
                Application Name
              </Label>
              <Input
                id="app-name"
                defaultValue="JnUITS Admin"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="app-url" className="text-sm font-medium">
                Application URL
              </Label>
              <Input
                id="app-url"
                defaultValue="https://jnuits.org.bd"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="app-desc" className="text-sm font-medium">
              Description
            </Label>
            <Input
              id="app-desc"
              defaultValue="National AI & IT Summit 2026"
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-6">Email Settings</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-host" className="text-sm font-medium">
                SMTP Host
              </Label>
              <Input
                id="smtp-host"
                placeholder="smtp.gmail.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="smtp-port" className="text-sm font-medium">
                SMTP Port
              </Label>
              <Input
                id="smtp-port"
                placeholder="587"
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-user" className="text-sm font-medium">
                SMTP Username
              </Label>
              <Input
                id="smtp-user"
                type="email"
                placeholder="your@email.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="smtp-pass" className="text-sm font-medium">
                SMTP Password
              </Label>
              <Input
                id="smtp-pass"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-6">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
            <div>
              <p className="font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground mt-1">Require 2FA for admin accounts</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
            <div>
              <p className="font-medium text-sm">Email Verification</p>
              <p className="text-sm text-muted-foreground mt-1">Require email verification for new users</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
            <div>
              <p className="font-medium text-sm">API Rate Limiting</p>
              <p className="text-sm text-muted-foreground mt-1">Enable rate limiting on API endpoints</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
            <div>
              <p className="font-medium text-sm">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground mt-1">Put application in maintenance mode</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="w-full md:w-auto">
          <Save size={18} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
