// components/registration/TeamSetupSection.tsx
"use client";

import { AlertCircle, Plus, Trash2, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FileUploadField } from "./FileUploadField";

export function TeamSetupSection({
  minMembers,
  maxMembers,
  extraMemberFee,
}: {
  minMembers: number;
  maxMembers: number;
  extraMemberFee: number; 
}) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control,
  });

  const totalTeamSize = fields.length + 1;
  const canAddMember = totalTeamSize < maxMembers;
  console.log("TeamSetupSection Rendered with team size:", extraMemberFee);
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <div className="flex items-center space-x-2 text-gray-900 font-semibold mb-4">
          <Users className="w-5 h-5 text-indigo-600" />
          <h3>Team Setup</h3>
          <p className="text-sm text-gray-500">
            {totalTeamSize} of {maxMembers} members
          </p>
        </div>
        <Controller
          control={control}
          name="teamName"
          render={({ field }) => (
            <Input {...field} placeholder="E.g. Code Ninjas" />
          )}
        />
      </div>

      <FieldGroup className="space-y-5">
        <AnimatePresence initial={false}>
          {fields.map((fieldItem, index) => {
            const memberNumber = index + 2;
            const isExtraMember = memberNumber > minMembers;

            return (
              <motion.div
                key={fieldItem.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm mt-2">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold flex items-center">
                      Member {memberNumber}
                      {isExtraMember && (
                        <span className="ml-3 text-[10px] text-blue-700 bg-blue-50 px-2 py-1 rounded">
                          Extra (+৳{extraMemberFee})
                        </span>
                      )}
                    </h4>
                    {isExtraMember && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name={`members.${index}.name`}
                      render={({ field }) => (
                        <Input {...field} placeholder="Name" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`members.${index}.email`}
                      render={({ field }) => (
                        <Input {...field} placeholder="Email" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`members.${index}.phone`}
                      render={({ field }) => (
                        <Input {...field} placeholder="Phone" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`members.${index}.institution`}
                      render={({ field }) => (
                        <Input {...field} placeholder="Institution" />
                      )}
                    />
                    <div className="sm:col-span-2">
                      <FileUploadField
                        name={`members.${index}.studentIdScan`}
                        label="Student ID Scan"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </FieldGroup>

      <div className="pt-2">
        {canAddMember ? (
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                email: "",
                phone: "",
                institution: "",
                studentIdScan: "",
              })
            }
            className="w-full flex items-center justify-center py-3 px-4 border-2 border-dashed border-indigo-200 rounded-xl text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Member {totalTeamSize + 1}
          </button>
        ) : (
          <div className="flex justify-center py-3 px-4 bg-amber-50 rounded-xl text-sm text-amber-700 border border-amber-100 font-medium">
            <AlertCircle className="w-4 h-4 mr-2" /> Team capacity reached (
            {maxMembers} max).
          </div>
        )}
      </div>
    </div>
  );
}
