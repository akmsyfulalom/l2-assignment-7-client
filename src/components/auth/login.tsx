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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
type TLoginUser = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm<TLoginUser>({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };



  const from = location.state?.from?.pathname || "/";



  const onSubmit = async (data: TLoginUser) => {
    const toastId = toast.loading("Loading...");
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };
      const res = await loginUser(userInfo).unwrap();
      const user = verifyToken(res?.token) as TUser;
      dispatch(setUser({ user: user, token: res?.token }));
      toast.success("Login successful!", {
        id: toastId,
        duration: 1000,
      });
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full !max-w-xl lg:w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">
              Login to DCHM Organization
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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
            <Button className="w-full">Login</Button>

            <div className="flex  gap-5 items-center justify-between mt-5">
              <p>Haven't any account</p>
              <NavLink
                to={"/register"}
                className="text-blue-700 font-bold text-md"
              >
                Create an account
              </NavLink>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginFrom;
