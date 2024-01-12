import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/signin-user-auth";
import { AuthSideBanner } from "@/components/shared/auth-side-banner";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

const SignUpPage = () => {
     
   
    return (
        <>
            <div className="">
                {/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
            </div>
            <div className="flex w-full h-screen justify-center items-center">
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Sign Up
                </Link>

                <div className="lg:p-8 p-4 w-full">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-4xl font-semibold tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-muted-foreground font-semibold">{" Log in to SMBos  "}</p>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Dont have an account?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Sign Up
                            </Link>{" "}
                            {/* and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Log In
                            </Link> */}
                            
                        </p>
                    </div>
                </div>
                <AuthSideBanner
                    text=" &ldquo;This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster than
                      ever before.&rdquo;"
                />
            </div>
        </>
    );
};

export default SignUpPage;
