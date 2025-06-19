import { z } from "zod";

//TODO: Fetch errror descriptions from api/strapi
export const beneficialOwnerSchema = z.object({
    name: z
        .string({
            required_error: "Owner's name is required",
        })
        .min(1, "Owner's name is required"),
    ssn: z
        .string({
            required_error: "SSN is required",
        })
        .min(1, "SSN is required"),
    ownership: z.preprocess(
        (value) => Number(value),
        z
            .number({
                required_error: "Ownership is required",
                invalid_type_error: "Ownership must be a number between 1 and 100",
            })
            .min(1, "Ownership must be between 1 and 100")
            .max(100, "Ownership must be between 1 and 100"),
    ),
    country: z
        .string({
            required_error: "Country is required",
        })
        .min(1, "Country is required"),
});
