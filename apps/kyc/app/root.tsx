import React from "react";
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useRouteError,
    LinksFunction,
    LoaderFunction,
} from "react-router";
import { SessionProvider } from "~/context/SessionContext";
import Error from "../components/Error/Error";
import tailwindStyles from "./global.css?url";

const DEFAULT_THEME = "sweden-b2b-application";
const DEFAULT_BG_IMAGE = "var(--bg-image)";

// Define the loader data type
type LoaderData = {
    theme: string;
    backgroundImage: string;
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: tailwindStyles }];

export const loader: LoaderFunction = async ({ params }) => {
    const productId = params.productId ?? DEFAULT_THEME;

    return Response.json({
        theme: productId,
        backgroundImage: DEFAULT_BG_IMAGE,
    });
};

function Document({
    children,
    theme = DEFAULT_THEME,
}: Readonly<{
    children: React.ReactNode;
    theme?: string;
}>) {
    return (
        <html lang="en" data-theme={theme}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const data = useLoaderData<LoaderData>();

    return (
        <Document theme={data?.theme || DEFAULT_THEME}>
            <SessionProvider>
                <Outlet />
            </SessionProvider>
        </Document>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    const message = isRouteErrorResponse(error)
        ? error.data
        : "Something went wrong. Please try again later.";

    return (
        <Document theme={DEFAULT_THEME}>
            <Error title="An error occurred!">
                <p className="text-xl my-5">{message}</p>
            </Error>
        </Document>
    );
}
