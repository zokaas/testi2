// Create this file: apps/kyc/app/routes/test-api.tsx
import { LoaderFunction, json } from "react-router";
import { getEnv } from "~/environment";

export const loader: LoaderFunction = async () => {
    const env = getEnv(process.env);
    
    const testData = {
        environment: {
            BFF_BASE_URL: env.BFF_BASE_URL,
            API_BASE_URL: env.API_BASE_URL,
            BFF_KYC_BASE_PATH: env.BFF_KYC_BASE_PATH,
            STRAPI_BASE_URL: env.STRAPI_BASE_URL,
            USE_MOCK_DATA: env.USE_MOCK_DATA,
        },
        endpoints: {
            sessionVerify: `${env.BFF_BASE_URL}/authenticate/verify/sweden-b2b-application`,
            formGet: `${env.BFF_BASE_URL}/${env.BFF_KYC_BASE_PATH}/form/sweden-b2b-application/onboarding`,
            formSubmit: `${env.BFF_BASE_URL}/${env.BFF_KYC_BASE_PATH}/form/answers/sweden-b2b-application/onboarding/test-app-id`,
        },
        checks: [],
    };

    // Test BFF connectivity
    try {
        const response = await fetch(`${env.BFF_BASE_URL}/health`, { 
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        });
        testData.checks.push({
            test: "BFF Health Check",
            status: response.ok ? "✅ PASS" : "❌ FAIL",
            details: `Status: ${response.status}`,
        });
    } catch (error) {
        testData.checks.push({
            test: "BFF Health Check",
            status: "❌ FAIL",
            details: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }

    // Test Strapi connectivity
    try {
        const response = await fetch(`${env.STRAPI_BASE_URL}/api/countries`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${env.STRAPI_AUTH_TOKEN}`,
            },
            signal: AbortSignal.timeout(5000)
        });
        testData.checks.push({
            test: "Strapi API Check",
            status: response.ok ? "✅ PASS" : "❌ FAIL",
            details: `Status: ${response.status}`,
        });
    } catch (error) {
        testData.checks.push({
            test: "Strapi API Check",
            status: "❌ FAIL",
            details: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }

    return json(testData);
};

export default function TestAPI() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">API Configuration Test</h1>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
                <div className="bg-gray-100 p-4 rounded">
                    <pre>{JSON.stringify(data.environment, null, 2)}</pre>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Expected Endpoints</h2>
                <div className="bg-gray-100 p-4 rounded">
                    <pre>{JSON.stringify(data.endpoints, null, 2)}</pre>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Connectivity Tests</h2>
                <div className="space-y-2">
                    {data.checks.map((check, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-white border rounded">
                            <span className="font-medium">{check.test}:</span>
                            <span>{check.status}</span>
                            <span className="text-sm text-gray-600">{check.details}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-400 p-4 rounded">
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Ensure your BFF service is running on localhost:3500</li>
                    <li>Verify the BFF can proxy requests to the actual KYC API</li>
                    <li>Check that Strapi is running on localhost:1337 with the correct auth token</li>
                    <li>Test with a real session ID by accessing the app through the proper flow</li>
                </ul>
            </div>
        </div>
    );
}