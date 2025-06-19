import React from "react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "react-router";

import { endOwnSession, getSessionData } from "~/services/sessionStorage.server";
import { endSession, getUserInfo, verifySession } from "~/services/sessionProvider.server";
import { validateFormData } from "validation/validateFormData";
import { mapDataForPayload } from "~/services/utils/mapDataForPayload.server";
import { getForm, sendFormData } from "~/services/api";
import { useSessionTTL } from "~/hooks/useSessionTTL";
import { parseFormValues } from "~/utils/formUtils";
import { MultiStepForm } from "components";
import { T_GetFormResponse, T_Payload, T_Question } from "~/types";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { kycType, productId } = params;

    const sessionId = await getSessionData(request, "sessionId");
    const companyName = await getSessionData(request, "companyName");
    const orgNumber = await getSessionData(request, "orgNumber");

    if (sessionId && productId) {
        const { status, ttl } = await verifySession(productId, sessionId);
        if (status && ttl && kycType) {
            try {
                const productData = await getForm(productId, kycType, sessionId);

                return Response.json({
                    ...productData,
                    companyName,
                    orgNumber,
                    ttl,
                    productId,
                    kycType,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Response("Error fetching data", { status: 500 });
            }
        }
    }
    return redirect("/error");
};

export const action: ActionFunction = async ({ request }) => {
    const sessionId = await getSessionData(request, "sessionId");
    const productId = await getSessionData(request, "productId");

    if (!sessionId || !productId) {
        return redirect("/error"); // Redirect to /error if sessionId is not found
    }

    const kycType = await getSessionData(request, "kycType");
    const applicationId = await getSessionData(request, "applicationId");

    const formData = await request.formData();
    const formValues = parseFormValues(formData);

    let questions: T_Question[] = [];
    const questionsStr = formData.get("questions");
    if (questionsStr) {
        try {
            questions = JSON.parse(questionsStr as string);
        } catch (error) {
            console.error("Error parsing questions:", error);
            return Response.json({
                errors: { general: "Invalid form data" },
                formValues,
            });
        }
    }

    const validationErrors = validateFormData(formValues, questions, questions.length - 1);

    if (validationErrors) {
        return Response.json({ errors: validationErrors, formValues });
    }

    let kcUserId = "";
    try {
        const userData = await getUserInfo(sessionId, productId);
        if (userData) kcUserId = userData.sub;
    } catch (error) {
        console.error("Failed to fetch user data", error);
    }

    // Include the variables in your payload
    const mappedPayload: T_Payload = mapDataForPayload(formValues, kcUserId, applicationId);

    const TIMEOUT_DURATION = 5000;

    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_DURATION),
    );

    try {
        // Attempt to send form data or handle timeout
        const { status, message } = await Promise.race([
            sendFormData(mappedPayload, productId, kycType, applicationId, sessionId),
            timeoutPromise,
        ]);

        console.log("SEND DATA: response status:", status, "message", message);
        if (status === "ok") {
            // Destroy cookie in kyc-session and end session on BFF
            await endOwnSession(request);
            await endSession(sessionId, productId);
        }
        return redirect("/thank-you");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("API request failed", error.message);
            return Response.json(
                { error: error.message || "Internal Server Error" },
                { status: (error as { status?: number }).status ?? 500 },
            );
        } else {
            console.error("An unknown error occurred");
            return Response.json({ error: "Unknown error occurred" }, { status: 500 });
        }
    }
};

type LoaderData = T_GetFormResponse & {
    companyName: string;
    orgNumber: string;
    ttl: number;
    productId: string;
    kycType: string;
};

const DynamicForm: React.FC = () => {
    const loaderData = useLoaderData<LoaderData>();
    const ttl = loaderData?.ttl;
    useSessionTTL(ttl);

    return <MultiStepForm />;
};

export default DynamicForm;
