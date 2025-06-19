import React from "react";
import { LoaderFunction } from "@remix-run/node";
import { Container } from "@ui-components/index";

export const loader: LoaderFunction = async () => {
    console.log("error, session not valid");
    return null;
};

const errorPage: React.FC = () => {
    return (
        <Container className="bg-base-100 shadow-xl p-6">
            <h2 className="text-2xl font-bold text-base-content">ERROR: SESSION NOT VALID</h2>
        </Container>
    );
};
export default errorPage;
