// Zod
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
    user: z
        .string({
            message: "Schema.User",
        })
        .email({
            message: "Schema.UserEmail",
        })
        .min(1, {
            message: "Schema.UserMin",
        }),
    password: z
        .string({
            message: "Schema.Password",
        })
        .min(1, {
            message: "Schema.PasswordMin",
        }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const transferSchema = z.object({
    plate: z
        .string({
            message: "Schema.Plate",
        })
        .min(1, {
            message: "Schema.PlateMin",
        })
        .regex(/^[0-9]{4}[A-Z]{3}$/, {
            message: "Schema.PlateRegex",
        }),
    transferType: z
        .string({
            message: "Schema.TransferType",
        })
        .min(1, {
            message: "Schema.TransferTypeMin",
        }),
    client: z
        .string({
            message: "Schema.Client",
        })
        .min(1, {
            message: "Schema.ClientMin",
        }),
    transmitter: z
        .string({
            message: "Schema.Transmitter",
        })
        .min(1, {
            message: "Schema.TransmitterMin",
        }),
    service: z
        .string({
            message: "Schema.Service",
        })
        .min(1, {
            message: "Schema.ServiceMin",
        }),
});

export type TTransferSchema = z.infer<typeof transferSchema>;

export const filterTransferSchema = z.object({
    plate: z
        .string({
            message: "Schema.Plate",
        })
        .min(1, {
            message: "Schema.PlateMin",
        })
        .regex(/^[0-9]{4}[A-Z]{3}$/, {
            message: "Schema.PlateRegex",
        })
        .optional(),
    transferType: z
        .string({
            message: "Schema.TransferType",
        })
        .min(1, {
            message: "Schema.TransferTypeMin",
        })
        .optional(),
});

export type TFilterTransferSchema = z.infer<typeof filterTransferSchema>;

