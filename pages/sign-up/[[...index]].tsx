import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/dashboard"
    />
  </div>
);

export default SignUpPage;
