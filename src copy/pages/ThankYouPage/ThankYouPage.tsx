import React, { useEffect } from "react";
import { Button, Container, Font } from "@opr-finance/styled-components";
import { pageStyles } from "@opr-finance/themes/sweden-foretagslan-application";
import { applicationPageStyles } from "@opr-finance/themes/sweden-foretagslan-application/pageStyles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { applicationSteps } from "../../types/general";
import { useSelector, useDispatch } from "react-redux";
import { onPageMount } from "../../utils/dataLayerEventHandler";
import { cleanLocalStorage } from "../../utils/cleanLocalStorage";
import { loginSessionActions } from "@opr-finance/features/login-session";
import { T_GlobalState } from "../../rootReducer";
import { isKYCRedirectActive, isKYCServiceDisabled } from "../../utils/kycServiceStatus";
import { buttonStyles } from "@opr-finance/themes/sweden-foretagslan-application/componentsStyles";
import { handleKycRedirect } from "../../utils/handleKycRedirect";

function ThankYouPage() {
    const dispatch = useDispatch();

const { gtm_userId } = useSelector((state: T_GlobalState) => state.login);

const { organizationNumber, name } = useSelector((state: T_GlobalState) => {
    const company = state.prefilledApplication.data?.company;
    return {
        organizationNumber: company?.organizationNumber,
        name: company?.name,
    };
});


    useEffect(() => {
        dispatch(loginSessionActions.setSkipSessionRedirect(true));
        dispatch(loginSessionActions.loginSessionEnd());
        cleanLocalStorage();
    }, [dispatch]);

    useEffect(() => {
        if (gtm_userId) {
            onPageMount(gtm_userId);
        }
    }, [gtm_userId]);


    const handleSessionAndRedirect = () => {
        if (organizationNumber && name) {
            handleKycRedirect(organizationNumber, name);
        } else {
            console.error("Missing organization number or name for KYC redirect");
        }
    };

const showKycButton = !isKYCServiceDisabled() && isKYCRedirectActive() && organizationNumber && name;

    return (
        <Container styles={applicationPageStyles.pageRootStyles}>
            <Container styles={applicationPageStyles.processBarThankYou}>
                <ProgressBar title="Låneansökan" currentStep={applicationSteps.SENT} />
            </Container>
            <Container styles={applicationPageStyles.formBlock}>
                <Font styles={pageStyles.applicationPageStyles.blockHeading}>
                    Tack för din ansökan!
                </Font>
                <Font styles={pageStyles.applicationPageStyles.blockBody}>
                    Vi behandlar ansökningar på vardagar mellan 9.00 och 16.00.
                </Font>

                <Font styles={pageStyles.applicationPageStyles.blockBody}>
                    Vi skickar kreditbeslutet, låneerbjudandet samt låneavtalet till din e-post så
                    att du kan skriva under. Om ditt lån även har en annan borgensman, skickar vi
                    låneavtalet till den borgensman du har angett för att tecknas elektroniskt. När
                    alla nödvändiga låneavtal är undertecknade betalar vi ut lånet till ditt företag
                    till kontot du angett.
                </Font>

                {showKycButton && (
                    <Button
                        onClick={handleSessionAndRedirect}
                        styles={buttonStyles.buttonStyles({ width: "200px" })}>
                        Fill KYC form
                    </Button>
                )}
            </Container>
        </Container>
    );
}

export default ThankYouPage;
