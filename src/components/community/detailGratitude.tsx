/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleCommunityQuery } from "@/redux/features/community/communityApi";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CircleUserRound } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/user";
import { toast } from "sonner";
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from "@/redux/features/comment/commentApi";
import { useForm } from "react-hook-form";

export default function DetailGratitude() {
  const { id } = useParams();
  const [views, setViews] = useState(0);
  const { data: post, isLoading } = useGetSingleCommunityQuery(id);
  const user = useAppSelector(selectCurrentUser);
  const { data: userData, isFetching } = useGetSingleUserQuery(user?.email);
  const [postComment] = usePostCommentMutation();
  const { data: comments, isLoading: commentsLoading } =
    useGetCommentQuery(id);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Posting Comment...");
    const commentData = {
      id: id,
      name: userData?.data?.name,
      email: userData?.data?.email,
      comment: data.comment,
    };
  
    try {
      await postComment(commentData).unwrap();
      toast.success("Comment Posted Successfully", {
        id: toastId,
        duration: 3000,
      });
      reset();
    } catch (error) {
      toast.error("Failed to post comment", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    incrementViews();
  }, [id]);
  const incrementViews = () => {
    setViews((prevViews) => prevViews + 1);
  };
  if (isFetching) {
    return (
      <div className="h-fit">
        <p className="text-center">Feching data...</p>
      </div>
    );
  }
  return (
    <div className="my-20">
      <div className="flex flex-col justify-center items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/community" className="text-xl font-semibold">
                  Community
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="#" className="text-xl font-semibold text-black">
                  Gratitude Detail
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : post ? (
        <div>
          <div className="max-w-4xl px-10 py-6 mx-auto bg-gray-50 ">
            <img
              src={post?.data?.image}
              className="object-cover w-full shadow-sm h-full"
              alt={post?.data?.title}
            />
          </div>
          <Card className="mx-20 p-3 gap-5">
            <CardTitle className=" hover:underline">
              {post?.data?.title}
            </CardTitle>
            <CardDescription>
              <p className="py-2">{post?.data?.createdAt}</p>
              <p>Views: {views}</p>
            </CardDescription>
            <CardContent className="mt-5">
              <p>{post?.data?.description}</p>
            </CardContent>
          </Card>
          <Card className="mx-20 p-3 gap-5 mt-5">
            <CardTitle className="text-center pb-5">Write a comment </CardTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                {...register("comment")}
                placeholder="Type your comment here."
              />
              <Button className="mt-3">Submit comment</Button>
            </form>
          </Card>

          <Card className="mx-20 p-3 gap-5 mt-5">
            {commentsLoading ? (
              <div>Loading comments...</div>
            ) : comments && comments.data.length > 0 ? (
              comments.data.map((comment: any, index: any) => (
                <div key={index}>
                  <div className="flex gap-3 border-b border-gray-300 pb-5 my-5">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcnh.png"
                        alt="user profile "
                      />
                      <AvatarFallback>
                        {" "}
                        <CircleUserRound />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm">{comment?.name}</CardTitle>
                      <CardDescription>{comment?.time}</CardDescription>
                      <CardTitle className="text-md">
                        {comment?.comment}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No comments yet.</div>
            )}
          </Card>
        </div>
      ) : (
        <p>No data found for this post.</p>
      )}
      <div className="text-center mt-10 ">
        <Link to="/community">
          <Button variant="secondary">Back to Community</Button>
        </Link>
      </div>
    </div>
  );
}
