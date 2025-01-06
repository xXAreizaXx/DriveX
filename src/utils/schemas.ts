// Zod
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
    user: z
        .string({
            message: "Schema.User",
        })
        .email({
            message: "Schema.User",
        })
        .min(1, {
            message: "Schema.User",
        }),
    password: z
        .string({
            message: "Schema.Password",
        })
        .min(1, {
            message: "Schema.Password",
        }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

