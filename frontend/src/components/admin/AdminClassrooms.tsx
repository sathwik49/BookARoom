import { Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/dashboard/PageHeader";
import ClassroomTable from "@/components/classroom/ClassRoomTable";
import Pagination from "@/components/Pagination";
import ClassRoomForm from "@/components/classroom/ClassRoomForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { queryKeys } from "@/api/axios";
import {
  createCrMutation,
  deleteCrMutation,
  getAllCrQuery,
  updateCrMutation,
} from "@/api/api";
import { useDebounce } from "@/hooks/useDebounce";
import type {
  CreateClassroomSchemaType,
  UpdateClassroomSchemaType,
} from "@/validations/classroom.validation";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/handleApiError";
import type { CRType } from "@/api/types";

export default function AdminClassrooms() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingCr, setEditingCr] = useState<CRType | null>(null);

  const debouncedSearch = useDebounce(search, 400);
  const queryClient = useQueryClient();

  const { data, isPending, isFetching } = useQuery({
    queryKey: [...queryKeys.CR.ALL, page, debouncedSearch],
    queryFn: () => getAllCrQuery({ page, limit: 6, search: debouncedSearch }),
    refetchOnWindowFocus: false,
  });

  const classRooms = data?.details.classrooms || [];
  const pagination = data?.details.pagination;

  const { mutate: createCr, isPending: isCreating } = useMutation({
    mutationKey: queryKeys.CR.CREATE,
    mutationFn: (data: CreateClassroomSchemaType) => createCrMutation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.CR.ALL });
      setCreateOpen(false);
      toast.success("Classroom created");
    },
    onError: (err) => handleApiError(err, "Couldn't create classroom"),
  });

  const { mutate: updateCr, isPending: isUpdating } = useMutation({
    mutationKey: queryKeys.CR.UPDATE,
    mutationFn: ({
      data,
      id,
    }: {
      data: UpdateClassroomSchemaType;
      id: string;
    }) => updateCrMutation(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.CR.ALL });
      setEditingCr(null);
      toast.success("Classroom updated");
    },
    onError: (err) => handleApiError(err, "Couldn't update classroom"),
  });

  const { mutate: deleteCr } = useMutation({
    mutationKey: queryKeys.CR.DELETE,
    mutationFn: (id: string) => deleteCrMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.CR.ALL });
      toast.success("Classroom deleted");
    },
    onError: (err) => handleApiError(err, "Couldn't delete classroom"),
  });

  return (
    <div className="space-y-3">
      <PageHeader
        title="Classrooms"
        description="Manage classrooms and room availability"
        action={
          <button
            onClick={() => setCreateOpen(true)}
            className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Classroom
          </button>
        }
      />

      <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm overflow-hidden flex-1 overflow-y-auto">
        <div className="px-5 py-2 border-b border-emerald-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Classrooms
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all classrooms
            </p>
          </div>
          <input
            placeholder="Search classrooms..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="h-11 w-full md:w-72 rounded-xl border border-emerald-100 bg-gray-50 px-4 outline-none focus:border-emerald-300"
          />
        </div>

        <ClassroomTable
          classRooms={classRooms}
          isLoading={isPending || isFetching}
          onEdit={(cr) => setEditingCr(cr)}
          onDelete={(id) => deleteCr(id)}
        />

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={pagination?.totalPages || 1}
        />
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Classroom</DialogTitle>
          </DialogHeader>
          <ClassRoomForm
            onClose={() => setCreateOpen(false)}
            isLoading={isCreating}
            onSubmit={(data) => createCr(data)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingCr} onOpenChange={() => setEditingCr(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Classroom</DialogTitle>
          </DialogHeader>
          <ClassRoomForm
            initialData={
              editingCr
                ? {
                    name: editingCr.name,
                    building: editingCr.building,
                    capacity: editingCr.capacity,
                    location: editingCr.location ?? undefined,
                  }
                : undefined
            }
            onClose={() => setEditingCr(null)}
            isLoading={isUpdating}
            onSubmit={(data) => updateCr({ data, id: editingCr!.id })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
