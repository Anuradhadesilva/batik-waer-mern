import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md border border-gray-200 bg-white p-10 shadow-sm rounded-none">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1a1c29]">
          Login
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"LOG IN"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={false}
      >
        <div className="flex items-center space-x-2 mb-6 mt-4">
          <Checkbox id="remember" className="rounded-none border-gray-400 text-black h-4 w-4" />
          <Label htmlFor="remember" className="text-sm font-medium leading-none text-gray-700 cursor-pointer">
            Remember me
          </Label>
        </div>
      </CommonForm>

      <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-700">
        <Link
          to="#"
          className="hover:text-black transition-colors"
        >
          Lost your password?
        </Link>
        <p>
          Not a member?{" "}
          <Link
            to="/auth/register"
            className="text-black font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
