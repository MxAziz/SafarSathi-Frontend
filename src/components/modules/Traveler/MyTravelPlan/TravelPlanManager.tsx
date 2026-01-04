"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog";
import ManagementTable, { Columns } from "@/components/shared/ManagementTable";
import { ITravelPlan } from "@/types/travelPlan.interface";
import {
  createTravelPlan,
  deleteTravelPlanAction,
  updateTravelPlan,
} from "@/services/traveler/travelPlan.service";
import BlurFade from "@/components/magicui/blur-fade";
import { IInputErrorState } from "@/utility/getInputFieldError";
import CreateTravelPlanForm from "./CreateTravelPlanForm";
import UpdateTravelPlanForm from "./UpdateTravelPlanForm";
import { toast } from "sonner";

// Initial State Definition
const initialState: IInputErrorState = {
  success: false,
  message: "",
  errors: [],
};

interface TravelPlanManagerProps {
  initialData: ITravelPlan[];
}

export default function TravelPlanManager({
  initialData,
}: TravelPlanManagerProps) {
  const [selectedPlan, setSelectedPlan] = useState<ITravelPlan | null>(null);
  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- 1. Create Hook ---
  const [createState, createFormAction, isCreatePending] = useActionState(
    createTravelPlan,
    initialState
  );

  // --- 2. Update Hook ---
  const [updateState, updateFormAction, isUpdatePending] = useActionState(
    updateTravelPlan,
    initialState
  );

  // --- 3. Delete Hook ---
  const [deleteState, deleteFormAction, isDeletePending] = useActionState(
    deleteTravelPlanAction,
    initialState
  );

  // --- Success Handling ---
  useEffect(() => {
    if (!createState.message) return;

    if (createState.success) {
      toast.success("Travel plan created successfully!");
      setTimeout(() => setIsCreateOpen(false), 0);
      setTimeout(() => setSelectedPlan(null), 0);
    } else {
      toast.error(createState.message);
    }
  }, [createState]);

  //Update
  useEffect(() => {
    if (!updateState.message) return;

    if (updateState.success) {
      toast.success("Travel plan update successfully!");
      setTimeout(() => setIsEditOpen(false), 0);
      setTimeout(() => setSelectedPlan(null), 0);
    } else {
      toast.error(updateState.message);
    }
  }, [updateState]);

  //Delete
  useEffect(() => {
    if (!deleteState.message) return;

    if (deleteState.success) {
      toast.success("Travel plan delete successfully!");
      setTimeout(() => setIsDeleteOpen(false), 0);
      setTimeout(() => setSelectedPlan(null), 0);
    } else {
      toast.error(deleteState.message);
    }
  }, [deleteState]);

  // --- Handlers ---
  const handleEdit = (row: ITravelPlan) => {
    setSelectedPlan(row);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (row: ITravelPlan) => {
    setSelectedPlan(row);
    setIsDeleteOpen(true);
  };

  // --- Table Columns ---
  const columns: Columns<ITravelPlan>[] = [
    {
      header: "Title",
      accessor: "title",
      className: "font-medium min-w-[150px]",
    },
    {
      header: "Destination",
      accessor: "destination",
    },
    {
      header: "Dates",
      accessor: (row) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.startDate).toLocaleDateString()} -{" "}
          {new Date(row.endDate).toLocaleDateString()}
        </span>
      ),
      className: "hidden md:table-cell",
    },
    {
      header: "Type",
      accessor: (row) => (
        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground">
          {row.travelType}
        </span>
      ),
    },
    {
      header: "Budget",
      accessor: "budgetRange",
      className: "hidden lg:table-cell",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Manage Plans</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Plan
        </Button>
      </div>

      <BlurFade delay={0.25} inView>
        <ManagementTable
          data={initialData}
          columns={columns}
          getRowKey={(row) => row.id}
          // onView={(row) => console.log("View", row)}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </BlurFade>

      {/* --- CREATE MODAL --- */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Travel Plan</DialogTitle>
            <DialogDescription>
              Fill in the details for your upcoming adventure.
            </DialogDescription>
          </DialogHeader>

          {/* Create Form ব্যবহার করা হয়েছে */}
          <CreateTravelPlanForm
            formAction={createFormAction}
            state={createState}
            isPending={isCreatePending}
          />
        </DialogContent>
      </Dialog>

      {/* --- UPDATE MODAL --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Travel Plan</DialogTitle>
            <DialogDescription>
              Modify the details of your trip to {selectedPlan?.destination}.
            </DialogDescription>
          </DialogHeader>

          {/* Update Form ব্যবহার করা হয়েছে এবং selectedPlan পাস করা হয়েছে */}
          {selectedPlan && (
            <UpdateTravelPlanForm
              defaultValues={selectedPlan}
              formAction={updateFormAction}
              state={updateState}
              isPending={isUpdatePending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* --- DELETE MODAL --- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              travel plan for{" "}
              <span className="font-bold">{selectedPlan?.title}</span>.
            </DialogDescription>
          </DialogHeader>

          <form action={deleteFormAction}>
            {selectedPlan && (
              <input type="hidden" name="id" value={selectedPlan.id} />
            )}

            {!deleteState.success && deleteState.message && (
              <div className="mb-4 text-sm text-red-500">
                {deleteState.message}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeletePending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeletePending}
              >
                {isDeletePending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}