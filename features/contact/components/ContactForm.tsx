"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormValues } from "../schema";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsPending(true);
    try {
      const response = { success: true, message: "Message sent successfully!" };
      //FIXME: Replace with actual API call to submit the contact form

      if (response.success) {
        toast.success(response.message);
        form.reset();
      } else if (response) {
        // সার্ভার সাইড এরর হ্যান্ডলিং
        Object.entries(response).forEach(([key, value]) => {
          form.setError(key as keyof ContactFormValues, {
            type: "manual",
            message: Array.isArray(value) ? value[0] : "Invalid input",
          });
        });
        toast.error("Please correct the form errors.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">
            Feel free to reach out. I&apos;ll get back to you as soon as
            possible.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <p className="font-medium">info@example.com</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <p className="font-medium">+880 1XXX XXXXXX</p>
            </div>
          </div>
        </div>

        {/* Right Section: Standard Form */}
        <div className="relative ">
          <div className=" absolute animate-pulse z-0 opacity-60 md:opacity-95 bg-violet-500 -top-2 w-80 h-80 blur-3xl" />
          <div className=" bg-white  z-10 relative p-6 rounded-xl shadow-sm">
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-semibold">
                  Name
                </label>
                <Input placeholder="Your Name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-semibold">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@domain.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-semibold">
                  Subject
                </label>
                <Input placeholder="Topic" {...form.register("subject")} />
                {form.formState.errors.subject && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 font-semibold">
                  Message
                </label>
                <Textarea
                  rows={4}
                  placeholder="Your message..."
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs font-medium text-destructive">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-5"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Message"}
                {!isPending && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
