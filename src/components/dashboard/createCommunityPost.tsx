import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CloudUpload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CardTitle } from "../ui/card";
import { usePostCommunityMutation } from "@/redux/features/community/communityApi";
import { useAppSelector } from "@/redux/hooks";



const IMAGE_ERROR_MESSAGE = "Please provide the image URL.";
const TITLE_ERROR_MESSAGE = "Title must be at least 2 characters.";

const schema = z.object({
  image: z
    .object({
      url: z.string().nonempty({ message: IMAGE_ERROR_MESSAGE }),
      alt: z.string().nonempty({ message: IMAGE_ERROR_MESSAGE }),
    })
    .optional(),
  title: z.string().min(2, { message: TITLE_ERROR_MESSAGE }),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

const CreateCommunityPost = () => {
  const [communityPost] = usePostCommunityMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {darkMode} = useAppSelector((store) => store.theme);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/upload",
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
    const toastId = toast.loading("Creating community post...");

    try {
      const communityData = {
        image: imageUrl,
        title: data.title,
        description: data.description,
      };
      console.log(communityData);
      communityPost(communityData).unwrap();
      toast.success("Community Created Successfully", {
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
      <CardTitle className="mb-10 mt-3">Create community post</CardTitle>
      <div className="flex flex-col">
        <main className="grid flex-1 gap-4 overflow-auto p-4">
          <div className="relative  flex-col items-start gap-8 md:flex">
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="community post title"
                    {...register("title", { required: true })}
                    className={`${
                      darkMode ? "bg-[#18191A] border-gray-600" : ""
                    }`}
                  />
                  {errors.title && (
                    <div className="text-red-500">{errors.title.message}</div>
                  )}
                </div>
                
                
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    {...register("description")}
                    className={`${
                      darkMode ? "bg-[#18191A] border-gray-600" : ""
                    }`}
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
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

export default CreateCommunityPost;
