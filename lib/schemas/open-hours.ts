import * as z from "zod";

export const OpenHoursSchema = z.object({
    day: z.string().min(1, { message: "Please enter a day" }),
    from: z.string().min(1, { message: "Please enter an open time" }),
    to: z.string().min(1, { message: "Please enter a close time" }),
    isOpen: z.boolean(),
})

