export const handleFetchResponse = async (response: Response) => {
    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        console.error(`Request failed with status ${response.status}: ${response.statusText}`);
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    
    try {
        return JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse JSON response:", error);
        throw new Error("Invalid JSON response from server");
    }
};

export const getRequest = async <T>(url: string, authToken: string): Promise<T> => {
    const method = "GET";
    const headers = new Headers({
        "Content-Type": "application/json",
        authorization: authToken,
    });

    const options: RequestInit = {
        method,
        headers,
    };

    console.log(`Making GET request to: ${url}`);
    console.log(`Headers:`, Object.fromEntries(headers.entries()));

    try {
        const response = await fetch(url, options);
        return await handleFetchResponse(response);
    } catch (error) {
        console.error(`Error with GET request to ${url}:`, error);
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(`Network error: Unable to connect to ${url}. Make sure your BFF service is running.`);
        }
        throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const postRequest = async <T, B>(url: string, authToken: string, data: B): Promise<T> => {
    const method = "POST";
    const headers = new Headers({
        "Content-Type": "application/json",
        authorization: authToken,
    });

    const options: RequestInit = {
        method,
        headers,
        ...(data ? { body: JSON.stringify(data) } : {}),
    };

    console.log(`Making POST request to: ${url}`);
    console.log(`Headers:`, Object.fromEntries(headers.entries()));
    console.log(`Body:`, data ? JSON.stringify(data, null, 2) : 'No body');

    try {
        const response = await fetch(url, options);
        return await handleFetchResponse(response);
    } catch (error) {
        console.error(`Error with POST request to ${url}:`, error);
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(`Network error: Unable to connect to ${url}. Make sure your BFF service is running.`);
        }
        throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};