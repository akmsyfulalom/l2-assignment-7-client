/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteSupplyMutation } from "@/redux/features/supplier/supplierApi";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const SupplyDeleteModal = ({ supply }: { supply: any }) => {
  const [supplyDelete, { isLoading, isSuccess }] = useDeleteSupplyMutation();
 

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      const data = {
        id: supply?._id,
      };
      await supplyDelete(data);
      toast.success("Delete supply", {
        id: toastId,
        duration: 1000,
      });
     
    } catch (error) {
      // Handle error, e.g., show an error message
      toast.error("Someting went wrong!", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Supply</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the{" "}
            <span className="font-bold">{supply?.title}</span>. If you delete
            the supply. you will didn't get it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={handleDelete}
            type="button"
            variant="destructive"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cencel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupplyDeleteModal;
