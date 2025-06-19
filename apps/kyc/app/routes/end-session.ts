// app/routes/api/end-session.ts
import { ActionFunction, json } from "react-router";
import { endSession } from "~/services/sessionProvider.server";
import { getSessionData } from "~/services/sessionStorage.server";

export const action: ActionFunction = async ({ request }) => {
    const sessionId = await getSessionData(request, "sessionId");
    const clientId = await getSessionData(request, "productId");

    if (!sessionId || !clientId) {
        return json({ error: "Session or client ID not found" }, { status: 400 });
    }

    try {
        const result = await endSession(sessionId, clientId);

        if (result?.status === 200) {
            return json({ success: true, message: "Session ended successfully" });
        } else {
            return json({ success: false, message: "Failed to end session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Failed to end session", error);
        return json({ success: false, message: "Error ending session" }, { status: 500 });
    }
};
