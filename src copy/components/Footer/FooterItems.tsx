import { Container, Font, Link } from "@opr-finance/styled-components";
import { componentStyles } from "@opr-finance/themes/sweden-foretagslan-application";
import { T_ItemContentProps } from "./types";

const { footerStyles } = componentStyles;

const companyInfo: T_ItemContentProps = {
    headingLinks: "",
    registrationDocumentLinkText: "",
    cookiesLinkText: "",
    headingCustomerService: "",
    openingHours: "Öppen vardagar kl. 09:00-16:00",
    companyWeb: "opr-foretagslan.se",
    companyWebLink: "https://www.opr-foretagslan.se/",
    phoneNumber: " 08-501 006 60",
    emailTextLink: "mailto: kundservice@opr-foretagslan.se",
    emailText: "kundservice@opr-foretagslan.se",
    FAQLinkText: "",
    headingContactAddress: "",
    companyName: "OPR-Finance AB",
    companyAddress: "Kungsbroplan 1",
    companyZipAndCity: "112 27 Stockholm",
    businessID: "Org.nr 556707-7044",
};

const Column1 = () => {
    return (
        <Container styles={footerStyles.footerItemWrapper}>
            <Font styles={footerStyles.itemHeading}>Kundservice</Font>
            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>{companyInfo.openingHours}</Font>
                <Font styles={footerStyles.text}>
                    <Link
                        styles={footerStyles.link}
                        href={companyInfo.companyWebLink}
                        target="_blank"
                        rel="noreferrer">
                        {companyInfo.companyWeb}
                    </Link>
                </Font>
            </Container>
        </Container>
    );
};

const Column2 = () => {
    return (
        <Container styles={footerStyles.footerItemWrapper}>
            <Font styles={footerStyles.itemHeading}>Kontakt</Font>
            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>E-mail</Font>
                <Font styles={footerStyles.text}>
                    <Link styles={footerStyles.link} href={companyInfo.emailTextLink}>
                        {companyInfo.emailText}
                    </Link>
                </Font>
            </Container>

            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>Telefon</Font>
                <Font styles={footerStyles.text}>{companyInfo.phoneNumber}</Font>
            </Container>
        </Container>
    );
};

const Column3 = () => {
    return (
        <Container styles={footerStyles.footerItemWrapper}>
            <Font styles={footerStyles.itemHeading}>Vår adress</Font>
            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>{companyInfo.companyName}</Font>
            </Container>
            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>{companyInfo.companyAddress}</Font>
                <Font styles={footerStyles.text}>{companyInfo.companyZipAndCity}</Font>
            </Container>
            <Container styles={footerStyles.itemRow}>
                <Font styles={footerStyles.text}>{companyInfo.businessID}</Font>
            </Container>
        </Container>
    );
};
Column1.displayName = "CustomerService";
Column2.displayName = "Contact";
Column3.displayName = "Address";

export const footerItems = [Column1, Column2, Column3];
