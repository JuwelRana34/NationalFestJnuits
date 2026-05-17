"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Link2,
  MapPin,
  Plus,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import { SegmentFormOutput, segmentSchema } from "../Types";

const baseDefaultValues: SegmentFormOutput = {
  title: "",
  subtitle: "",
  type: "DEFAULT",
  extraMemberFee: 0,
  description: "",
  image: "",
  date: "",
  time: "",
  venue: "",
  seatsTotal: 0,
  responsible: [],
  isTeamEvent: false,
  minMembers: undefined,
  maxMembers: undefined,
  prizeMoney: undefined,
  fee: 0,
};

export type EventFormMode = "create" | "edit";

export interface EventFormProps {
  mode: EventFormMode;
  title: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (data: SegmentFormOutput) => Promise<void> | void;
  onCancel?: () => void;
  initialValues?: Partial<SegmentFormOutput>;
}

export default function EventForm({
  mode,
  title,
  description,
  submitLabel,
  submittingLabel,
  onSubmit,
  onCancel,
  initialValues,
}: EventFormProps) {
  const resolvedDefaults = useMemo<SegmentFormOutput>(
    () => ({
      ...baseDefaultValues,
      ...initialValues,
      responsible: initialValues?.responsible ?? [],
    }),
    [initialValues],
  );

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SegmentFormOutput>({
    resolver: zodResolver(segmentSchema),
    defaultValues: resolvedDefaults,
  });

  useEffect(() => {
    reset(resolvedDefaults);
  }, [reset, resolvedDefaults]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsible",
  });

  const isTeamEvent = useWatch({
    control,
    name: "isTeamEvent",
    defaultValue: resolvedDefaults.isTeamEvent,
  });

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
            {mode === "edit" ? "Edit Event" : "Create Event"}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="overflow-hidden border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/30">
            <div className="border-b border-slate-800 bg-slate-900/70 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-100">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Core details about the event.
              </p>
            </div>
            <div className="space-y-6 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-200">
                    Event Title <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Hackathon 2026"
                    className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="text-slate-200">
                    Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    placeholder="e.g., Build for impact"
                    className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                    {...register("subtitle")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-slate-200">
                    Event Type <span className="text-red-400">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-slate-700 bg-slate-950/60 text-slate-100">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-800 bg-slate-950 text-slate-100">
                          {[
                            "HACKATHON",
                            "APP_SHOWCASE",
                            "AI_ADVENTURE",
                            "IT_OLYMPIAD",
                            "TYPING_MASTER",
                            "ESPORTS",
                            "VISITOR",
                            "DEFAULT",
                          ].map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.type && (
                    <p className="text-xs text-red-400">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-slate-200">
                    Image URL
                  </Label>
                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100 placeholder:text-slate-500"
                      {...register("image")}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-xs text-red-400">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-slate-200">
                    Description <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    rows={5}
                    placeholder="Describe the event, rules, and important details..."
                    className="min-h-36 border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/30">
            <div className="border-b border-slate-800 bg-slate-900/70 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-100">
                Schedule & Venue
              </h2>
            </div>
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-200">
                    Date <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="date"
                      type="date"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100"
                      {...register("date")}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-xs text-red-400">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-slate-200">
                    Time <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    className="border-slate-700 bg-slate-950/60 text-slate-100"
                    {...register("time")}
                  />
                  {errors.time && (
                    <p className="text-xs text-red-400">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-slate-200">
                    Venue <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="venue"
                      placeholder="Main Auditorium"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100 placeholder:text-slate-500"
                      {...register("venue")}
                    />
                  </div>
                  {errors.venue && (
                    <p className="text-xs text-red-400">
                      {errors.venue.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/30">
            <div className="border-b border-slate-800 bg-slate-900/70 px-5 py-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-100">
                Registration & Capacity
              </h2>
            </div>
            <div className="space-y-6 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="seatsTotal" className="text-slate-200">
                    Total Seats <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="seatsTotal"
                      type="number"
                      min="0"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100"
                      {...register("seatsTotal", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </div>
                  {errors.seatsTotal && (
                    <p className="text-xs text-red-400">
                      {errors.seatsTotal.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fee" className="text-slate-200">
                    Registration Fee <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="fee"
                      type="number"
                      min="0"
                      step="0.01"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100"
                      {...register("fee", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </div>
                  {errors.fee && (
                    <p className="text-xs text-red-400">{errors.fee.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prizeMoney" className="text-slate-200">
                    Prize Money
                  </Label>
                  <div className="relative">
                    <Trophy className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="prizeMoney"
                      type="number"
                      min="0"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100"
                      {...register("prizeMoney", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </div>
                  {errors.prizeMoney && (
                    <p className="text-xs text-red-400">
                      {errors.prizeMoney.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extraMemberFee" className="text-slate-200">
                    Extra Member Fee
                  </Label>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="extraMemberFee"
                      type="number"
                      min="0"
                      step="0.01"
                      className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100"
                      {...register("extraMemberFee", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                  </div>
                  {errors.extraMemberFee && (
                    <p className="text-xs text-red-400">
                      {errors.extraMemberFee.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <input
                  id="isTeamEvent"
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                  {...register("isTeamEvent")}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="isTeamEvent"
                    className="text-base text-slate-100"
                  >
                    This is a team event
                  </Label>
                  <p className="text-sm text-slate-400">
                    Enable this when participants must register in groups.
                  </p>
                </div>
              </div>

              {isTeamEvent && (
                <div className="grid grid-cols-1 gap-5 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 p-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="minMembers" className="text-cyan-100">
                      Minimum Members
                    </Label>
                    <Input
                      id="minMembers"
                      type="number"
                      min="1"
                      className="border-cyan-900/60 bg-slate-950/60 text-slate-100"
                      {...register("minMembers", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                    {errors.minMembers && (
                      <p className="text-xs text-red-300">
                        {errors.minMembers.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxMembers" className="text-cyan-100">
                      Maximum Members
                    </Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="1"
                      className="border-cyan-900/60 bg-slate-950/60 text-slate-100"
                      {...register("maxMembers", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                      })}
                    />
                    {errors.maxMembers && (
                      <p className="text-xs text-red-300">
                        {errors.maxMembers.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="extraMemberFeeTeam"
                      className="text-cyan-100"
                    >
                      Extra Member Fee
                    </Label>
                    <div className="relative">
                      <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/70" />
                      <Input
                        id="extraMemberFeeTeam"
                        type="number"
                        min="0"
                        step="0.01"
                        className="border-cyan-900/60 bg-slate-950/60 pl-10 text-slate-100"
                        {...register("extraMemberFee", {
                          setValueAs: (v) => (v === "" ? undefined : Number(v)),
                        })}
                      />
                    </div>
                    {errors.extraMemberFee && (
                      <p className="text-xs text-red-300">
                        {errors.extraMemberFee.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="overflow-hidden border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/30">
            <div className="flex flex-col gap-3 border-b border-slate-800 bg-slate-900/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-100">
                  Organizers & Contacts
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Add the people responsible for this event.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() =>
                  append({
                    name: "",
                    role: "",
                    phone: "",
                    email: "",
                    socialLink: "",
                  })
                }
                className="w-full bg-cyan-600 text-slate-50 hover:bg-cyan-500 sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Person
              </Button>
            </div>

            <div className="p-5 sm:p-6">
              {fields.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-10 text-center text-sm text-slate-500">
                  No responsible contacts added yet. Use the button above to add
                  one.
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => remove(index)}
                        className="absolute right-3 top-3 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="grid grid-cols-1 gap-4 pr-10 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-slate-200">
                            Name <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="Jane Doe"
                            className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                            {...register(`responsible.${index}.name` as const)}
                          />
                          {errors.responsible?.[index]?.name && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.name?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-200">
                            Role <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="Coordinator"
                            className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                            {...register(`responsible.${index}.role` as const)}
                          />
                          {errors.responsible?.[index]?.role && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.role?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-200">
                            Phone <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="01XXXXXXXXX"
                            className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                            {...register(`responsible.${index}.phone` as const)}
                          />
                          {errors.responsible?.[index]?.phone && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.phone?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-200">
                            Email <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            type="email"
                            placeholder="jane@example.com"
                            className="border-slate-700 bg-slate-950/60 text-slate-100 placeholder:text-slate-500"
                            {...register(`responsible.${index}.email` as const)}
                          />
                          {errors.responsible?.[index]?.email && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.email?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-slate-200">Social Link</Label>
                          <div className="relative">
                            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <Input
                              type="url"
                              placeholder="https://linkedin.com/in/username"
                              className="border-slate-700 bg-slate-950/60 pl-10 text-slate-100 placeholder:text-slate-500"
                              {...register(
                                `responsible.${index}.socialLink` as const,
                              )}
                            />
                          </div>
                          {errors.responsible?.[index]?.socialLink && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.socialLink?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:flex-row sm:justify-end sm:p-6">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-600 text-slate-50 hover:bg-cyan-500 sm:w-auto"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
