import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {useNavigate} from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useAuthTokenStore } from "@/store";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});

export default function SignIn() {
  const setToken = useAuthTokenStore((state)=>state.setToken);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/login`,values)       
      if(data){
        localStorage.setItem("token",data.token);
        setToken(data.token);
        toast.success("signed in successFully");
        navigate('/')
        }
      }
     catch (error) {
      console.log(error?.response?.data)
      toast.error(error?.response?.data?error.response?.data:"unable to sign-in");
      return;
    }

  };
  const checkToken = async ()=>{
    let token = localStorage.getItem("token");    
    if(token){
      // console.log("hello")
      navigate('/')
    }
  }

  useEffect(()=>{
    checkToken();
  },[])

  return (
    <div className="flex flex-col items-center w-full h-screen align-middle justify-center">
      <Form {...form}>
        <Card className="md:w-1/2 w-full">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between items-center">
                <Button type="submit">Submit</Button>
                <span className="text-sm">
                  not have an accout? click here to &nbsp;
                  <Link className="underline font-semibold" to={"/sign-up"}>Sign Up</Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
