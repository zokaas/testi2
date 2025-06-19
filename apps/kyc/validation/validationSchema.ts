import { T_Question, T_DependentQuestion, T_QuestionType } from "~/types";
import { z } from "zod";
import { beneficialOwnerSchema } from "./beneficialOwnerSchema";

// Create a reusable function for building basic field schemas
const createFieldSchema = (type: T_QuestionType): z.ZodTypeAny => {
    switch (type) {
        case "Text":
        case "Textarea":
            return z
                .string({
                    required_error: "This field is required",
                    invalid_type_error: "This field must be a string",
                })
                .min(1, "This field is required")
                .max(200, "Maximum length is 200 characters");
        case "Number":
            return z.preprocess(
                (val) => (val === "" ? undefined : Number(val)),
                z
                    .number({
                        required_error: "This field is required",
                        invalid_type_error: "This field must be a number",
                    })
                    .min(0, "Value must be a positive number"),
            );
        case "Select":
        case "RadioGroup":
            return z.string({
                required_error: "Please select an option",
                invalid_type_error: "Please select an option",
            });
        case "MultiSelectDropdown":
            return z
                .array(z.string(), {
                    required_error: "Please select at least one option",
                    invalid_type_error: "Please select at least one option",
                })
                .min(1, "Please select at least one option");

        case "BeneficialOwner":
            return z
                .array(beneficialOwnerSchema, {
                    required_error: "At least one beneficial owner is required",
                    invalid_type_error: "Invalid beneficial owner data",
                })
                .min(1, "At least one beneficial owner is required");

        default:
            return z.any();
    }
};

const buildDependentSchema = (
    field: T_DependentQuestion,
    formValues: Record<string, unknown>,
): z.ZodTypeAny | null => {
    const { componentType, conditionValue, questionParameter } = field;

    // Validate that required fields exist
    if (!componentType || !questionParameter || !conditionValue) {
        console.error("Missing required fields in dependent question:", field);
        return null;
    }

    // Create the base schema
    const schema = createFieldSchema(componentType as T_QuestionType);

    // Check if the condition is met
    const parentValue = formValues[conditionValue];
    if (parentValue === undefined) {
        console.warn(`Parent value not found for condition: ${conditionValue}`);
        return schema.optional();
    }

    return parentValue === conditionValue ? schema : schema.optional();
};

export const buildSchema = (questions: T_Question[], formValues: Record<string, unknown>) => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};

    questions.forEach((question) => {
        const { questionParameter, componentType, dynamicField } = question.rawData;

        // Validate main question fields
        if (!questionParameter || !componentType) {
            console.error("Missing required fields in question:", question);
            return;
        }

        // Build schema for main question
        schemaShape[questionParameter] = createFieldSchema(componentType as T_QuestionType);

        // Process dynamic fields if they exist
        if (dynamicField?.length) {
            dynamicField.forEach((field) => {
                if (field.__component === "kyc.dependent-question") {
                    try {
                        const dependentQuestion = field as T_DependentQuestion;
                        const depSchema = buildDependentSchema(dependentQuestion, formValues);

                        if (depSchema && dependentQuestion.componentType) {
                            schemaShape[dependentQuestion.componentType] = depSchema;
                        }
                    } catch (error) {
                        console.error("Error processing dependent question:", error);
                    }
                }
            });
        }
    });

    return z.object(schemaShape);
};

export { beneficialOwnerSchema };
