/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateSupplyMutation } from "@/redux/features/supplier/supplierApi";


const TITLE_ERROR_MESSAGE = "Title must be at least 2 characters.";
const AMOUNT_ERROR_MESSAGE = "Amount must be a positive number.";

const schema = z.object({
  title: z.string().min(2, { message: TITLE_ERROR_MESSAGE }),
  category: z.string().optional(),
  amount: z.number().min(0, { message: AMOUNT_ERROR_MESSAGE }),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

const SupplyEditModal = ({ supply }: { supply: any }) => {
  const [updateSupply, { isLoading }] = useUpdateSupplyMutation();


  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: supply?.title || "",
      category: supply?.category || "",
      amount: supply?.amount || "",
      description: supply?.description || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Updating supply...");

    try {
      const supplierData = {
        title: data.title,
        amount: Number(data.amount),
        category: data.category,
        description: data.description,
      };
      const options = {
        id: supply._id,
        data: supplierData,
      };
      console.log(options);
      await updateSupply(options);
      toast.success("Supply Updated Successfully", {
        id: toastId,
        duration: 1000,
      });
    } catch (error) {
      toast.error("Something Went Wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Supply</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <main className="grid flex-1 gap-4 overflow-auto p-4">
            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <fieldset className="rounded-lg border p-4 w-full">
                
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid items-start gap-6"
                  >
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Supplier title"
                        {...register("title", { required: true })}
                      />
                      {errors.title && (
                        <div className="text-red-500">
                          {errors.title.message}
                        </div>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="category">Categories</Label>
                      <select
                        {...register("category", { required: true })}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                      >
                        <option value="">Select a category</option>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="blueberry">Blueberry</option>
                        <option value="grapes">Grapes</option>
                        <option value="pineapple">Pineapple</option>
                      </select>

                      {errors.category && (
                        <div className="text-red-500">
                          {errors.category.message}
                        </div>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Supplier amount"
                        {...register("amount", { valueAsNumber: true })}
                      />
                      {errors.amount && (
                        <div className="text-red-500">
                          {errors.amount.message}
                        </div>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Description"
                        {...register("description")}
                      />
                      {errors.description && (
                        <div className="text-red-500">
                          {errors.description.message}
                        </div>
                      )}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                      </Button>
                  </form>
            
              </fieldset>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplyEditModal;
