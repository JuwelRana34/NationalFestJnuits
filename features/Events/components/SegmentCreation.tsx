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
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { SegmentFormInput, SegmentFormOutput, segmentSchema } from "../Types";
import { createSegment } from "../actions";

// --- Main Form Component ---
export default function CreateSegmentForm() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SegmentFormOutput, SegmentFormInput>({
    resolver: zodResolver(segmentSchema),
    defaultValues: {
      isTeamEvent: false,
      responsible: [],
      extraMemberFee: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "responsible",
  });

  const isTeamEvent = useWatch({
    control,
    name: "isTeamEvent",
    defaultValue: false,
  });

  const onSubmit = async (data: SegmentFormOutput) => {
    console.log("Validated Data Submitted:", data);
    alert("Form submitted successfully! Check console for payload.");
    // seatsFilled is left exactly as requested
    await createSegment({ ...data, seatsFilled: 0 });
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-cyan-500">
            Create New Segment
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Fill in the details below to define a new event or program segment.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* SECTION 1: Basic Information */}
          <Card className="overflow-hidden bg-slate-800 border-slate-700">
            <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4">
              <h3 className="text-lg font-medium leading-6 text-slate-300">
                Basic Information
              </h3>
              <p className="mt-1 text-sm ">Core details about the segment.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="title">
                    Segment Title <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="title"
                    className="text-cyan-200 border-slate-600"
                    placeholder="e.g., Hackathon 2024"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="subtitle">
                    Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    className="text-cyan-200 border-slate-600"
                    placeholder="e.g., Code for the future"
                    {...register("subtitle")}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="type">
                    Segment Type <span className="text-red-400">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`w-full bg-slate-800 border-slate-700 ${
                            field.value ? "text-cyan-200" : "text-slate-400"
                          }`}
                        >
                          <SelectValue placeholder="Select a segment type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-700 text-slate-100">
                          <SelectItem value="HACKATHON">HACKATHON</SelectItem>
                          <SelectItem value="APP_SHOWCASE">
                            APP_SHOWCASE
                          </SelectItem>
                          <SelectItem value="AI_ADVENTURE">
                            AI_ADVENTURE
                          </SelectItem>
                          <SelectItem value="IT_OLYMPIAD">
                            IT_OLYMPIAD
                          </SelectItem>
                          <SelectItem value="TYPING_MASTER">
                            TYPING_MASTER
                          </SelectItem>
                          <SelectItem value="ESPORTS">
                            ESPORTS
                          </SelectItem>
                          <SelectItem value="VISITOR">
                            VISITOR
                          </SelectItem>
                          <SelectItem value="DEFAULT">
                            DEFAULT
                          </SelectItem>
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
                  <Label className="text-slate-200" htmlFor="image">
                    Image URL
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-cyan-500" />
                    </div>
                    <Input
                      id="image"
                      type="url"
                      className="pl-10 text-cyan-200 border-slate-600"
                      placeholder="https://example.com/image.jpg"
                      {...register("image")}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-xs text-red-400">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300" htmlFor="description">
                  Description <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="description"
                  rows={4}
                  className="text-cyan-200 border-slate-600"
                  placeholder="Detailed description of the segment..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* SECTION 2: Schedule & Location */}
          <Card className="overflow-hidden bg-slate-800">
            <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4">
              <h3 className="text-lg font-medium leading-6 text-slate-300">
                Schedule & Location
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="date">
                    Date<span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-slate-500" />
                    </div>
                    <Input
                      id="date"
                      type="date"
                      className="pl-10 text-slate-200 border-slate-600"
                      {...register("date")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="time">
                    Time<span className="text-red-400">*</span>
                  </Label>
                  <Input
                    className="text-slate-200 border-slate-600"
                    id="time"
                    type="time"
                    {...register("time")}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="venue">
                    Venue<span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-slate-500" />
                    </div>
                    <Input
                      id="venue"
                      className="pl-10 text-slate-200 border-slate-600"
                      placeholder="Main Auditorium"
                      {...register("venue")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* SECTION 3: Capacity & Financials */}
          <Card className="overflow-hidden bg-slate-800">
            <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4">
              <h3 className="text-lg font-medium leading-6 text-slate-300">
                Registration Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Event format toggle */}
              <div className="flex items-center space-x-3 bg-slate-700 p-4 rounded-lg border border-slate-800">
                <input
                  id="isTeamEvent"
                  type="checkbox"
                  {...register("isTeamEvent")}
                  className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500"
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor="isTeamEvent"
                    className="text-base text-slate-300 cursor-pointer"
                  >
                    This is a Team Event
                  </Label>
                  <span className="text-sm text-slate-400">
                    Enable this if participants must register as a group.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2 ">
                  <Label className="text-slate-300" htmlFor="seatsTotal">
                    Total Seats<span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-4 w-4 text-slate-500" />
                    </div>
                    <Input
                      id="seatsTotal"
                      type="number"
                      min="0"
                      className="pl-10 text-slate-200 border-slate-600"
                      placeholder="e.g., 100"
                      {...register("seatsTotal", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.seatsTotal && (
                    <p className="text-xs text-red-400">
                      {errors.seatsTotal.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="fee">
                    Registration Fee<span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-slate-500" />
                    </div>
                    <Input
                      id="fee"
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-10 text-slate-200 border-slate-600"
                      placeholder="0.00"
                      {...register("fee", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.fee && (
                    <p className="text-xs text-red-400">{errors.fee.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300" htmlFor="prizeMoney">
                    Prize Money<span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Trophy className="h-4 w-4 text-slate-500" />
                    </div>
                    <Input
                      id="prizeMoney"
                      type="number"
                      min="0"
                      className="pl-10 text-slate-200 border-slate-600"
                      placeholder="0.00"
                      {...register("prizeMoney", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.prizeMoney && (
                    <p className="text-xs text-red-400">
                      {errors.prizeMoney.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional Team Inputs with added extraMemberFee */}
              {isTeamEvent && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-cyan-950/30 border border-cyan-900/50 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label className="text-cyan-300" htmlFor="minMembers">
                      Minimum Members per Team
                    </Label>
                    <Input
                      id="minMembers"
                      type="number"
                      min="1"
                      placeholder="e.g., 2"
                      className="border-cyan-800 focus:ring-cyan-500 text-cyan-300"
                      {...register("minMembers", { valueAsNumber: true })}
                    />
                    {errors.minMembers && (
                      <p className="text-xs text-red-400">
                        {errors.minMembers.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxMembers" className="text-cyan-300">
                      Maximum Members per Team
                    </Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="1"
                      placeholder="e.g., 4"
                      className="border-cyan-800 focus:ring-cyan-500 text-cyan-300"
                      {...register("maxMembers", { valueAsNumber: true })}
                    />
                    {errors.maxMembers && (
                      <p className="text-xs text-red-400">
                        {errors.maxMembers.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="extraMemberFee" className="text-cyan-300">
                      Extra Member Fee
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-4 w-4 text-cyan-600/50" />
                      </div>
                      <Input
                        id="extraMemberFee"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-10 border-cyan-800 focus:ring-cyan-500 text-cyan-300"
                        {...register("extraMemberFee", { valueAsNumber: true })}
                      />
                    </div>
                    {errors.extraMemberFee && (
                      <p className="text-xs text-red-400">
                        {errors.extraMemberFee.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* SECTION 4: Responsible Persons */}
          <Card className="overflow-hidden bg-slate-800">
            <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-slate-300">
                  Organizers & POCs
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  People responsible for this segment.
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
                className="h-8 text-xs bg-cyan-600 text-slate-100 hover:bg-cyan-700"
              >
                <Plus className="mr-2 h-3.5 w-3.5" /> Add Person
              </Button>
            </div>
            <div className="p-6">
              {fields.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50">
                  No responsible persons added yet. Click &quot;Add Person&quot;
                  to assign someone.
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative p-5 border border-slate-700 rounded-lg bg-slate-900/50 group"
                    >
                      <div className="absolute top-3 right-3">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-slate-500 hover:text-red-400 hover:bg-red-950/50 h-8 w-8 p-0"
                          title="Remove person"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                        <div className="space-y-2">
                          <Label className="text-slate-300">
                            Name <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="Jane Doe"
                            className="text-slate-200 border-slate-600"
                            {...register(`responsible.${index}.name` as const)}
                          />
                          {errors.responsible?.[index]?.name && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">
                            Role <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="Coordinator"
                            className="text-slate-200 border-slate-600"
                            {...register(`responsible.${index}.role` as const)}
                          />
                          {errors.responsible?.[index]?.role && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.role?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">
                            Phone<span className="text-red-400">*</span>
                          </Label>
                          <Input
                            placeholder="+1 234..."
                            className="text-slate-200 border-slate-600"
                            {...register(`responsible.${index}.phone` as const)}
                          />
                          {errors.responsible?.[index]?.phone && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.phone?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-300">
                            Email<span className="text-red-400">*</span>
                          </Label>
                          <Input
                            type="email"
                            placeholder="jane@example.com"
                            className="text-slate-200 border-slate-600"
                            {...register(`responsible.${index}.email` as const)}
                          />
                          {errors.responsible?.[index]?.email && (
                            <p className="text-xs text-red-400">
                              {errors.responsible[index]?.email?.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-slate-300">Social Link</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Link2 className="h-4 w-4 text-slate-500" />
                            </div>
                            <Input
                              type="url"
                              className="pl-10 text-cyan-500 underline border-slate-600"
                              placeholder="https://linkedin.com/in/username"
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

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              className="bg-cyan-600 text-slate-100 hover:bg-cyan-700"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Segment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
