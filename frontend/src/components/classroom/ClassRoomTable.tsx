import type { CRType } from "@/api/types";
import { Pencil, Trash2 } from "lucide-react";

export default function ClassroomTable({
  classRooms,
  isLoading,
  onEdit,
  onDelete,
}: {
  classRooms: CRType[];
  isLoading: boolean;
  onEdit: (cr: CRType) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-emerald-50">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Name
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Building
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Capacity
            </th>

            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
              Location
            </th>

            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                Loading classrooms...
              </td>
            </tr>
          ) : classRooms.length > 0 ? (
            classRooms.map((classroom) => (
              <tr key={classroom.id} className="border-t border-emerald-100">
                <td className="px-6 py-2 font-medium text-gray-900">
                  {classroom.name}
                </td>

                <td className="px-6 py-2 text-gray-600">
                  {classroom.building}
                </td>

                <td className="px-6 py-2 text-gray-600">
                  {classroom.capacity}
                </td>

                <td className="px-6 py-2 text-gray-600">
                  {classroom.location}
                </td>

                <td className="px-6 py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(classroom)}
                      className="h-10 w-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-emerald-700" />
                    </button>

                    <button
                      onClick={() => onDelete(classroom.id)}
                      className="h-10 w-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                No Classrooms Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
