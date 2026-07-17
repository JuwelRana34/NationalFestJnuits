"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { honoFetch } from "@/lib/hono-client";
import { deleteImage, uploadImage } from "@/lib/uploadImage";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
// আপনার আলাদা করে রাখা টাইপগুলো ইম্পোর্ট করা হলো
import { FormValues, GetEventValues } from "../types";

interface EventFormProps {
  initialData?: GetEventValues | null;
}

export default function EventForm({ initialData }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.coverImage || null,
  );

  const isEditing = !!initialData;

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          subtitle: initialData.subtitle || "",
          eventType: initialData.eventType,
          description: initialData.description,
          isActive: initialData.isActive,
          fee: initialData.fee,
          baseTeamSize: initialData.baseTeamSize,
          maxExtraMembers: initialData.maxExtraMembers,
          extraMemberFee: initialData.extraMemberFee,
          prizeMoney: initialData.prizeMoney || 0,
          venue: initialData.venue,
          time: initialData.time || "",

          eventDate: initialData.eventDate?.slice(0, 16) || "",
          deadline: initialData.deadline?.slice(0, 16) || "",

          responsible: initialData.responsible || [],

          // Data Mapping: DB Array -> Form String
          registrationSchema:
            initialData.registrationSchema?.map((field) => ({
              label: field.label,
              type: field.type,
              required: field.required,
              options: field.options ? field.options.join(", ") : "",
            })) || [],

          isSubmissionOpen: initialData.isSubmissionOpen,

          // Data Mapping: DB Array -> Form String
          submissionSchema:
            initialData.submissionSchema?.map((field) => ({
              label: field.label,
              type: field.type,
              required: field.required,
              options: field.options ? field.options.join(", ") : "",
            })) || [],

          coverImage: null, // এডিট মোডে ফাইল ইনপুট ফাঁকা থাকে
        }
      : {
          title: "",
          subtitle: "",
          isActive: true,
          eventType: "solo",
          description: "",
          fee: 0,
          baseTeamSize: 0,
          maxExtraMembers: 0,
          extraMemberFee: 0,
          prizeMoney: 0,
          venue: "",
          time: "",
          eventDate: "",
          deadline: "",
          responsible: [],
          registrationSchema: [
            { label: "Full Name", type: "text", required: true, options: "" },
          ],
          isSubmissionOpen: false,
          submissionSchema: [],
          coverImage: null,
        },
  });

  const {
    fields: registrationFields,
    append: appendRegistration,
    remove: removeRegistration,
  } = useFieldArray({ control, name: "registrationSchema" });

  const {
    fields: responsibleFields,
    append: appendResponsible,
    remove: removeResponsible,
  } = useFieldArray({ control, name: "responsible" });

  const {
    fields: submissionFieldsList,
    append: appendSubmission,
    remove: removeSubmission,
  } = useFieldArray({ control, name: "submissionSchema" });

  const selectedEventType = watch("eventType");
  const isSubmissionOpen = watch("isSubmissionOpen");
  const watchCoverImage = watch("coverImage");

  useEffect(() => {
    if (watchCoverImage && watchCoverImage.length > 0) {
      const file = watchCoverImage[0];
      const objectUrl = URL.createObjectURL(file);

      setImagePreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [watchCoverImage]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Form String -> DB Array Conversion
      const formattedSchema = data.registrationSchema.map((field) => ({
        id: field.label.toLowerCase().replace(/[\s_-]+/g, "_"),
        label: field.label,
        type: field.type,
        required: field.required,
        ...(field.type === "select" && {
          options: field.options
            .split(",")
            .map((opt) => opt.trim())
            .filter(Boolean),
        }),
      }));

      // Form String -> DB Array Conversion
      const formattedSubmissionSchema = data.isSubmissionOpen
        ? data.submissionSchema.map((field) => ({
            id: field.label.toLowerCase().replace(/[\s_-]+/g, "_"),
            label: field.label,
            type: field.type,
            required: field.required,
            ...(field.type === "select" && {
              options: field.options
                .split(",")
                .map((opt) => opt.trim())
                .filter(Boolean),
            }),
          }))
        : [];

     let coverImageUrl = initialData?.coverImage ?? "";

     // যদি ইউজার নতুন কোনো ছবি সিলেক্ট করে থাকে
     if (data.coverImage && data.coverImage.length > 0) {
       try {
         // ১. প্রথমে নতুন ছবিটি আপলোড করুন
         coverImageUrl = await uploadImage(data.coverImage[0], "events");

         // ২. আপলোড সফল হলে এবং এটি Edit Mode হলে, পুরনো ছবিটি ডিলিট করে দিন
         if (isEditing && initialData?.coverImage) {
           // deleteImage ফাংশনটি ইম্পোর্ট করে নিতে ভুলবেন না!
           await deleteImage(initialData.coverImage);
           console.log("Old image scheduled for deletion.");
         }
       } catch (err) {
         console.error(err);

         if (err instanceof Error) {
           console.error(err.message);
           console.error(err.stack);
         }

         alert(err instanceof Error ? err.message : "Upload failed");
         setIsSubmitting(false);
         return; // আপলোড ফেইল করলে ফর্ম সাবমিট বন্ধ করে দিবে
       }
     }

      // Payload for API
      const payload = {
        ...(isEditing && initialData?.id ? { id: initialData.id } : {}),
        title: data.title,
        subtitle: data.subtitle,
        eventType: data.eventType,
        description: data.description,
        fee: data.fee,
        prizeMoney: data.prizeMoney,
        deadline: data.deadline,
        eventDate: data.eventDate,
        time: data.time,
        venue: data.venue,
        isActive: data.isActive,
        coverImage: coverImageUrl,
        registrationSchema: formattedSchema,
        responsible: data.responsible,
        isSubmissionOpen: data.isSubmissionOpen,
        submissionSchema: formattedSubmissionSchema,
        ...(data.eventType === "team" && {
          baseTeamSize: data.baseTeamSize,
          maxExtraMembers: data.maxExtraMembers,
          extraMemberFee: data.extraMemberFee,
        }),
      };

      console.log("Sending Payload:", payload);

      const endpoint = isEditing
        ? `/api/events/${initialData.id}`
        : "/api/events";

      const method = isEditing ? "PATCH" : "POST";

      const { status, response } = await honoFetch<{
        success: boolean;
        data: GetEventValues;
      }>(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (status === 200 && response) {
        alert(
          isEditing
            ? "Event updated successfully!"
            : "Event created successfully!",
        );
      } else {
        alert("Failed to save event.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto border rounded p-2 md:p-6 bg-white my-10 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        {isEditing ? "Edit Event" : "Create New Event"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* =====================
            1. Basic Information 
        ====================== */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Cover Image (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-32 object-cover rounded-md mb-4"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>
                      {isEditing && imagePreview
                        ? "Change file"
                        : "Upload a file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      {...register("coverImage")}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. National AI & IT Summit 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Type
            </label>
            <select
              {...register("eventType")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="solo">Solo Participant</option>
              <option value="team">Team Based</option>
              <option value="seminar">Seminar / Workshop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Registration Fee (৳)
            </label>
            <input
              type="number"
              {...register("fee", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 500"
            />
          </div>

          {selectedEventType === "team" && (
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 border border-blue-100 p-4 rounded-lg mt-2">
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">
                  Base Team Size
                </label>
                <input
                  type="number"
                  {...register("baseTeamSize", { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">
                  Max Extra Members
                </label>
                <input
                  type="number"
                  {...register("maxExtraMembers", { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-1">
                  Extra Member Fee (৳)
                </label>
                <input
                  type="number"
                  {...register("extraMemberFee", { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Date
            </label>
            <input
              type="datetime-local"
              step="any"
              {...register("eventDate", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Deadline
            </label>
            <input
              type="datetime-local"
              step="any"
              {...register("deadline", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue
            </label>
            <input
              type="text"
              {...register("venue")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. JnU Central Auditorium"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Description (Optional)
            </label>
            <textarea
              rows={4}
              {...register("description")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write something about the event..."
            />
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-orange-500 mb-2">
              Event Status
            </h4>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <div
                  className={`flex items-center justify-between ${field.value ? "bg-green-100" : "bg-red-100"} rounded-md border p-4`}
                >
                  <p className="text-sm text-gray-700 font-medium">
                    {field.value ? "Event is Active" : "Event is Inactive"}
                  </p>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>

        {/* =====================
            2. Responsible / Organizers
        ====================== */}
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-orange-900">
                Responsible / Organizers (Optional)
              </h3>
              <p className="text-sm text-orange-700">
                Add contact info for event coordinators
              </p>
            </div>
            <Button
              type="button"
              onClick={() => appendResponsible({ name: "", phone: "" })}
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              + Add Organizer
            </Button>
          </div>

          <div className="space-y-4">
            {responsibleFields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-wrap sm:flex-nowrap gap-4 items-center bg-white p-3 rounded-lg border border-orange-200"
              >
                <input
                  {...register(`responsible.${index}.name`, { required: true })}
                  placeholder="Name"
                  className="flex-1 min-w-[200px] px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  {...register(`responsible.${index}.phone`, {
                    required: true,
                  })}
                  placeholder="Phone"
                  className="flex-1 min-w-[200px] px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="button"
                  onClick={() => removeResponsible(index)}
                  className="text-red-500 hover:text-red-700 p-2 ml-auto"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =====================
            3. Registration Form Builder 
        ====================== */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Registration Form Builder
              </h3>
            </div>
            <Button
              type="button"
              onClick={() =>
                appendRegistration({
                  label: "",
                  type: "text",
                  required: false,
                  options: "",
                })
              }
              className="px-4 py-2 text-sm font-medium rounded-lg"
            >
              + Add Field
            </Button>
          </div>

          <div className="space-y-4">
            {registrationFields.map((item, index) => {
              const currentType = watch(`registrationSchema.${index}.type`);
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap md:flex-nowrap gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm items-start"
                >
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Field Label
                    </label>
                    <input
                      {...register(`registrationSchema.${index}.label`, {
                        required: true,
                      })}
                      placeholder="e.g. University Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="w-full md:w-1/4">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Input Type
                    </label>
                    <select
                      {...register(`registrationSchema.${index}.type`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="url">Link / URL</option>
                      <option value="select">Dropdown (Select)</option>
                      <option value="file">File Upload (Image/PDF)</option>
                    </select>
                  </div>

                  {currentType === "select" && (
                    <div className="w-full md:w-1/3">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Options (Comma separated)
                      </label>
                      <input
                        {...register(`registrationSchema.${index}.options`, {
                          required: true,
                        })}
                        placeholder="M, L, XL, XXL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  <div className="w-full md:w-auto flex items-center mt-6 gap-4">
                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(`registrationSchema.${index}.required`)}
                        className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />{" "}
                      Required
                    </label>
                    {registrationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRegistration(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================
            4. Submission Form Builder 
        ====================== */}
        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">
                Project Submission Builder
              </h3>
              <p className="text-sm text-indigo-700">
                Set up what participants need to submit later.
              </p>
            </div>
            <Controller
              name="isSubmissionOpen"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    Require Submission?
                  </span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>

          {isSubmissionOpen && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() =>
                    appendSubmission({
                      label: "",
                      type: "url",
                      required: true,
                      options: "",
                    })
                  }
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  + Add Submission Field
                </Button>
              </div>

              {submissionFieldsList.length === 0 && (
                <div className="text-center py-6 bg-white border border-dashed border-indigo-200 rounded-lg text-indigo-400">
                  Click &quot;+ Add Submission Field&quot; to configure
                  requirements.
                </div>
              )}

              {submissionFieldsList.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-wrap md:flex-nowrap gap-4 bg-white p-4 rounded-lg border border-indigo-200 shadow-sm items-start"
                  >
                    <div className="w-full md:w-1/3">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Requirement Label
                      </label>
                      <input
                        {...register(`submissionSchema.${index}.label`, {
                          required: true,
                        })}
                        placeholder="e.g. GitHub Repository Link"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="w-full md:w-1/4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Expected Type
                      </label>
                      <select
                        {...register(`submissionSchema.${index}.type`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500"
                      >
                        <option value="url">Link / URL</option>
                        <option value="file">File Upload (PDF/ZIP)</option>
                        <option value="text">Short Text</option>
                      </select>
                    </div>
                    <div className="w-full md:w-auto flex items-center mt-6 gap-4">
                      <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register(`submissionSchema.${index}.required`)}
                          className="mr-2 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />{" "}
                        Required
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSubmission(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-200"
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Update Event"
              : "Save & Publish Event"}
        </button>
      </form>
    </div>
  );
}