import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Container, Font, Image } from "@opr-finance/styled-components";
import { pageStyles } from "@opr-finance/themes/sweden-foretagslan-application";
import { loginSessionActions } from "@opr-finance/features/login-session";

import bankID from "../../images/bankID.svg";
import { useNavigate } from "react-router-dom";
import { T_GatewayProps } from "../../types/general";
import { getBffProps } from "../../utils/getBffProps";
import { onPageMount } from "../../utils/dataLayerEventHandler";

function StartPage() {
    const dispatch = useDispatch();
    const { startPageStyles } = pageStyles;

    const bff: T_GatewayProps = getBffProps();

    const handleLogin = () => {
        dispatch(loginSessionActions.loginSessionTrigger());
    };

    useEffect(() => {
        dispatch(loginSessionActions.loginSessionInitializer(bff));
    }, []);

    useEffect(() => {
        onPageMount("");
        // Set reloads counter for refreshing Application page to restore Tag manager connection to website
        localStorage.setItem("reloads", "0");
    }, []);

    return (
        <Container styles={startPageStyles.pageRootStyles}>
            <Container styles={startPageStyles.loginContainer}>
                <Font styles={startPageStyles.loginText}>
                    Verifirera med Bank-ID för att slutföra ansökan{" "}
                </Font>
                <Container
                    onClick={async () => {
                        handleLogin();
                    }}
                    styles={startPageStyles.bankContainer}>
                    <Image styles={startPageStyles.bank} alt="bankId" src={bankID} />
                </Container>
            </Container>
        </Container>
    );
}

export default StartPage;
