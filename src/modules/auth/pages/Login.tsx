import { Link, useNavigate } from "react-router-dom";
import TextInput from "@/components/TextInput"; // Adjust the import path as needed
import Button from "@/components/Button"; // Adjust the import path as needed
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutate } from "@/hooks/useMutate";
import Cookies from "js-cookie";

const Login = () => {
  // ------------ hooks -------------
  const { mutateAsync } = useMutate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // ------------ functions ------------
  const onSubmit: SubmitHandler<any> = (data: any) => {
    mutateAsync({
      url: "/auth/login",
      method: "POST",
      body: data,
    })
      .then((data) => {
        Cookies.set("token", data.data.token);
        Cookies.set("username", data.data.username);
        Cookies.set("image", data.data.image);
        Cookies.set("userId", data.data.id);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <h1 className="text-3xl font-semibold mb-5">Login to your account</h1>
        <TextInput placeholder="Email Address" {...register("email")} />
        <p>{errors.email?.message}</p>
        <TextInput
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <Button label="Login" className="w-full rounded-sm mt-2" />
        <Link
          className="underline font-semibold mt-5 text-gray hover:text-softGray"
          to={"/auth/sign-up"}
        >
          Don't have an account? Sign Up
        </Link>
      </form>
    </section>
  );
};

export default Login;
