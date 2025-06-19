import { LoaderFunction, redirect } from "@remix-run/node";
import React from "react";
import { mockSessionParams } from "mock/sessionMock";
import { saveSession } from "~/services/sessionStorage.server";

export const loader: LoaderFunction = async () => {
    // Save mock session data in cookie
    const sessionCookie = await saveSession(mockSessionParams);

    return redirect(`/${mockSessionParams.productId}/${mockSessionParams.kycType}`, {
        headers: {
            "Set-Cookie": sessionCookie,
        },
    });
};

export default function DevRoute() {
    return <div>Redirecting to test environment...</div>;
}
