// components/registration/FileUploadField.tsx
"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { uploadStudentId } from "@/lib/uploadStudentId"; // Adjust path

interface FileUploadFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
}

export function FileUploadField({
  name,
  label,
  isRequired = true,
}: FileUploadFieldProps) {
  // 💡 ম্যাজিক এখানেই! Parent থেকে প্রপস না নিয়ে সরাসরি Context থেকে control নিচ্ছি।
  const { control } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File, onChange: (url: string) => void) => {
    setIsUploading(true);
    try {
      const url = await uploadStudentId(file);
      onChange(url);
    } catch (error) {
      console.error(`Upload failed for ${name}`, error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FieldLabel>
          <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) await handleUpload(file, field.onChange);
              }}
            />
            {isUploading ? (
              <span className="flex items-center gap-2 text-indigo-600 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </span>
            ) : field.value ? (
              <span className="flex items-center gap-2 text-emerald-600 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Uploaded! Click to change.
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                Click to upload file
              </span>
            )}
          </label>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
