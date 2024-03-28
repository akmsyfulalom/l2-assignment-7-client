import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CloudUpload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useState } from "react";
import axios from "axios";
import { usePostSupplyMutation } from "@/redux/features/supplier/supplierApi";
import { toast } from "sonner";


const IMAGE_ERROR_MESSAGE = "Please provide the image URL.";
const TITLE_ERROR_MESSAGE = "name must be at least 2 characters.";
const MOBILE_ERROR_MESSAGE = "Mobile number must be a positive number.";
const EMAIL_ERROR_MESSAGE = "Email Required.";
const LOCATION_ERROR_MESSAGE = "Email Required.";
const PASSION_ERROR_MESSAGE = "Email Required.";

const schema = z.object({
  image: z
    .object({
      url: z.string().nonempty({ message: IMAGE_ERROR_MESSAGE }),
      alt: z.string().nonempty({ message: IMAGE_ERROR_MESSAGE }),
    })
    .optional(),
  name: z.string().min(2, { message: TITLE_ERROR_MESSAGE }),
  mobile: z.string().min(11, { message: MOBILE_ERROR_MESSAGE }),
  email: z.number().min(1, { message: EMAIL_ERROR_MESSAGE }),
  location: z.string().min(1, { message: LOCATION_ERROR_MESSAGE }),
  passion: z.string().min(1, { message: PASSION_ERROR_MESSAGE }),
});

type FormData = z.infer<typeof schema>;

const Volunteer = () => {
  const [postSupply] = usePostSupplyMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post(
          "https://l2-assignment-6-server-snowy.vercel.app/api/v1/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImageUrl(response.data.url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Form submitting...");

    try {
      const supplierData = {
        image: imageUrl,
        name: data.name,
        mobile: data?.mobile,
        email: data.email,
        passion: data.passion,
        location: data.location
      };
      console.log(supplierData);
      postSupply(supplierData).unwrap();
      toast.success("Form submit Successfully", {
        id: toastId,
        duration: 1000,
      });
      reset();
      setFile(null);
      setImageUrl("");
    } catch (error) {
      toast.error("Something Want Wrong", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <div className="text-center my-20">
        <h4 className=" text-lg font-semibold mb-3">
          Register form for Volunteer
        </h4>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary dark:text-white font-bold mb-2">
          Let’s help together
        </h2>
      </div>
      <div className="flex flex-col max-w-2xl mx-auto">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <fieldset className="rounded-lg border p-4 w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid items-start gap-6"
              >
                <div className="grid gap-3">
                  <Label htmlFor="image">
                    {errors.image
                      ? errors.image.message
                      : "Drop your picture here"}
                  </Label>
                  <div className="relative border border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center items-center">
                    <Input
                      id="image"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="max-h-48 max-w-48 flex flex-col justify-center items-center gap-5">
                      {file && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Uploaded"
                          className="w-full h-auto"
                        />
                      )}
                      {file && (
                        <Button
                          type="reset"
                          onClick={() => {
                            setFile(null);
                            setImageUrl("");
                          }}
                        >
                          Reset Image
                        </Button>
                      )}
                    </div>
                    {!file && (
                      <div className="flex flex-col justify-center items-center">
                        <CloudUpload
                          style={{ width: "48px", height: "48px" }}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          Drag and drop or click to upload
                        </p>
                      </div>
                    )}
                  </div>
                  {errors.image && (
                    <div className="text-red-500">{errors.image.message}</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="title">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="full name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="text"
                    placeholder="mobile"
                    {...register("mobile", { required: true })}
                  />
                  {errors.mobile && (
                    <div className="text-red-500">{errors.mobile.message}</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    {...register("email", { valueAsNumber: true })}
                  />
                  {errors.email && (
                    <div className="text-red-500">{errors.email.message}</div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="location"
                    {...register("location", { required: true })}
                  />
                  {errors.location && (
                    <div className="text-red-500">
                      {errors.location.message}
                    </div>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="location">Passion Tagline</Label>
                  <Input
                    id="passion "
                    type="text"
                    placeholder="passion"
                    {...register("passion", { required: true })}
                  />
                  {errors.passion && (
                    <div className="text-red-500">
                      {errors.passion.message}
                    </div>
                  )}
                </div>

                

                <Button type="submit">Submit</Button>
              </form>
            </fieldset>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Volunteer;
