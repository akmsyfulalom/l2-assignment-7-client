import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";



const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const RegisterFrom = () => {
    const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating.....");
    try {
      const userInfo = {
        name: data?.name,
        email: data?.email,
        password: data?.password,
      };
      console.log("🚀 ~ onSubmit ~ userInfo:", userInfo)
      await registerUser(userInfo);
      toast.success("Register successful!", {
        id: toastId,
        duration: 1000,
      });

      reset();
      navigate(`/login`);
    } catch (error) {
      toast.error("Something went wrong!", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full !max-w-xl lg:w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">
              Register to DCHM Organization
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="your name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="your password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                {/* Show/hide password toggle icon */}
                {showPassword ? (
                  <EyeOff
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Eye
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Register</Button>

            <div className="flex  gap-5 items-center justify-between mt-5">
              <p>Already have an account</p>
              <NavLink
                to={"/login"}
                className="text-blue-700 font-bold text-md"
              >
                Login
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RegisterFrom;
