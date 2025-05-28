"use client"

import ReCAPTCHA from "react-google-recaptcha"; // reCAPTCHA import

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
   recaptcha: z.string().min(1, "Please verify that you are not a robot."),
})

const siteKey = "6Lf6kU0rAAAAAP3OsaCAZYmU-gMLEIM7PK4QrpyZ"; // Replace with your actual site key
const ContactForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
           recaptcha: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log("Form submitted with values:", values);
        try {

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values }),
            });
            console.log("Response status:", response.status);
            if (response.ok) {
                console.log("Form submitted successfully");
                form.reset();
            } else {
                console.error("Form submission failed");
            }


        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <div className='max-w-md mx-auto p-6 border border-orange-500 mt-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>

                                <FormMessage className='text-red-500'/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage className='text-red-500'/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="message" {...field} />
                                </FormControl>
                                <FormMessage className='text-red-500'/>
                            </FormItem>
                        )}
                    />
                    <ReCAPTCHA
                        sitekey={siteKey}// Replace with your actual site key
                        onChange={(token) => {
                            form.setValue("recaptcha", token || "");
                        }}
                        onExpired={() => {
                            form.setValue("recaptcha", "");
                        }}
                    />
                    <Button type="submit" className='w-full bg-orange-500 hover:bg-orange-600 cursor-pointer'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default ContactForm