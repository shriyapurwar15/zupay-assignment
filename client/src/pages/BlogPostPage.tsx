import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {  useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CircleX, Edit2Icon } from "lucide-react";
import { useAuthTokenStore } from "@/store";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  text: z.string().min(2, {
    message: "text must be at least 2 characters.",
  }),
});

const BlogPostPage = () => {
  const token = useAuthTokenStore((state) => state.token);
  const handleClick = ()=>{
    if(!token){
      toast.error("Please login to edit this post");
      setEditing(false);
    }
    else setEditing(true);
  }
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const { blogId } = useParams();
  const [creatingNew, setCreatingNew] = useState(false);
  const getPost = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/posts/${blogId}`
      );
      form.setValue("title", data.title);
      form.setValue("text", data.text);
      if (!data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("unable to fetch that specific blog");
    }
  };
  const [editing, setEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  // console.log(blogId)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (creatingNew) {

        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/posts`,
          values,
          config
        );

        if (data) {
          toast.success("post created successfully");
          navigate("/");
        }
      }
      else if(editing){
        const {data} = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/posts/${blogId}`,values,config);
        if(data){
          toast.success("post updated successfully");
          setEditing(false);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Unable to create that post");
      }
    }
    finally{
      setEditing(false);
      setCreatingNew(false);
      setLoading(false);
    }

    // console.log(values);
  }

  useEffect(() => {
    if (blogId != "create") {
      getPost();
    } else {
      setCreatingNew(true);
    }
   
  }, [blogId, editing , token]);
  return (
    <div className="flex flex-col p-6 px-10 transition-all ">
      <div className="w-full flex-row justify-end flex  ">
        {!editing && !creatingNew && (
          <Button onClick={handleClick}>
            Edit &nbsp; <Edit2Icon size={12} />
          </Button>
        )}
        {editing && (
          <Button
            className="flex flex-row items-center"
            onClick={() => setEditing(false)}
          >
            Cancel &nbsp; <CircleX size={15} />
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={(!editing && !creatingNew) || loading}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                {editing && (
                  <FormDescription>
                    This is your public Blog Post title.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Content</FormLabel>
                <FormControl>
                  <Textarea
                    style={{ height: "300px" }}
                    className=""
                    disabled={(!editing && !creatingNew) || loading}
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                {editing && (
                  <FormDescription>
                    This is your public Blog Post Content.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          {(editing || creatingNew) && <Button disabled={loading} type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
};

export default BlogPostPage;
