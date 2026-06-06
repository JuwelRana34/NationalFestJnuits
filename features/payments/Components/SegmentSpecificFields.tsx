"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SegmentType } from "../types";

export function SegmentSpecificFields({
  segmentType,
}: {
  segmentType?: SegmentType;
}) {
  const { control } = useFormContext();

  // Helper to strictly type the path based on your schema
  const metaPath = (key: string) => `segmentMeta.${key}`;

  if (segmentType === "HACKATHON") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">Technical Links</h4>
        <Controller
          control={control}
          name={metaPath("githubLink")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                GitHub Profile{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="https://github.com/username"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("portfolioLink")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Portfolio Link{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="https://your-portfolio.com"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  if (segmentType === "APP_SHOWCASE") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">Project Details</h4>
        <Controller
          control={control}
          name={metaPath("appTitle")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                App/Software Title <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="My Awesome App"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("abstract")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Abstract <span className="text-red-500">*</span>{" "}
                <span className="text-gray-400 font-normal">
                  (max 400 words)
                </span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={5}
                placeholder="Briefly describe the problem your app solves..."
                value={(field.value as string) || ""}
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  if (segmentType === "AI_ADVENTURE") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">Creative Brief</h4>
        <Controller
          control={control}
          name={metaPath("conceptNote")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Concept Note <span className="text-red-500">*</span>{" "}
                <span className="text-gray-400 font-normal">
                  (max 150 words)
                </span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={4}
                placeholder="Describe your AI video concept..."
                value={(field.value as string) || ""}
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("previousWorkLink")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Previous Work{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="Link to previous AI generations or portfolio"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("videoDurationConfirmed")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <span className="text-sm text-gray-700">
                  I confirm my generated video will be exactly{" "}
                  <strong>1 minute</strong> long.
                </span>
              </label>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  if (segmentType === "TYPING_MASTER") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">
          Performance Details
        </h4>
        <Controller
          control={control}
          name={metaPath("previousWpm")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Current Average WPM <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="e.g. 85"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("blueKeyboardConsent")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <span className="text-sm text-gray-700">
                  I acknowledge and consent to using{" "}
                  <strong>Blue Switch</strong> mechanical keyboards provided at
                  the event.
                </span>
              </label>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  if (segmentType === "ESPORTS") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">Player Profile</h4>
        <Controller
          control={control}
          name={metaPath("ign")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                In-Game Name (IGN) <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="Your exact in-game name"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("gameId")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Game ID / UID <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="e.g. 1234567890"
                value={(field.value as string) || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name={metaPath("previousAchievements")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Previous Achievements{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={3}
                placeholder="Any notable ranks or tournament wins..."
                value={(field.value as string) || ""}
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  if (segmentType === "VISITOR") {
    return (
      <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 text-sm">
          Visitor Preferences
        </h4>
        <Controller
          control={control}
          name={metaPath("topicsOfInterest")}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Topics of Interest <span className="text-red-500">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={3}
                placeholder="e.g. AI in healthcare, Web3, Cybersecurity..."
                value={(field.value as string) || ""}
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    );
  }

  // IT_OLYMPIAD and DEFAULT return nothing as they don't have extra fields
  return null;
}
