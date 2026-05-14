import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClassroomSchema,
  type CreateClassroomSchemaType,
} from "@/validations/classroom.validation";
import { Loader2 } from "lucide-react";

interface ClassRoomFormProps {
  initialData?: Partial<CreateClassroomSchemaType>;
  onSubmit?: (data: CreateClassroomSchemaType) => void;
  onClose?: () => void;
  isLoading?: boolean;
}

export default function ClassRoomForm({
  initialData,
  onSubmit,
  onClose,
  isLoading,
}: ClassRoomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassroomSchemaType>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      name: initialData?.name || "",
      building: initialData?.building || "",
      capacity: initialData?.capacity || 0,
      location: initialData?.location || "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit?.(data))}
      className="space-y-4"
    >
      <div>
        <input
          {...register("name")}
          placeholder="Classroom name"
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-300"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("building")}
          placeholder="Building"
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-300"
        />
        {errors.building && (
          <p className="text-red-500 text-sm mt-1">{errors.building.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Capacity</label>
        <input
          type="number"
          {...register("capacity", { valueAsNumber: true })}
          placeholder="e.g. 60 students"
          min={0}
          className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-300"
        />
        <p className="text-xs text-gray-400 mt-1">
          Maximum number of students this classroom can hold
        </p>
        {errors.capacity && (
          <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("location")}
          placeholder="Location (optional)"
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-300"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer disabled:opacity-60 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
