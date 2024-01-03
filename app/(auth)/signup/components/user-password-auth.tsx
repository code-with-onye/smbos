"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ImGoogle, ImSpinner6 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axios from "@/lib/axios";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterStore } from "@/lib/store/register-store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
    password: z.string().min(1, { message: "Please enter a password" }),
});

export const UserPasswordAuth = ({
    className,
    ...props
}: UserAuthFormProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const { user } = useRegisterStore();

    const { mutate: register } = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: z.infer<typeof formSchema>) =>
            axios.post("/register", data),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            register(
                { ...user, ...values },
                {
                    onSuccess: () => {
                        router.push("/login");
                    },
                    onError: (error:any) => {
                        toast.error(error.response.data.message);
                    },
                }
            );
        }, 3000);
    }

    return (
        <Form {...form}>
            {/* <form onSubmit={onSubmit}> */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-3 ">
                    {/* password*/}

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="password">
                                            Business Name
                                        </Label>

                                        <Input
                                            id="password"
                                            placeholder="Password"
                                            type="password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading}>
                        {isLoading && <ImSpinner6 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                </div>
            </form>
        </Form>
    );
};
