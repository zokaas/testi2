import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { E_Routes } from "../../types";

function LandingRedirect() {
    const navigate = useNavigate();
    let { uuid } = useParams();
    localStorage.setItem("applicationUuid", JSON.stringify(uuid));
    useEffect(() => {
        if (uuid) navigate(E_Routes.START);
        if (!uuid || uuid === "undefined") navigate(E_Routes.ERROR);
    }, []);

    return <></>;
}

export default LandingRedirect;
