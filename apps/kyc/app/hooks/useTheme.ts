import { useLoaderData } from "@remix-run/react";

export function useTheme() {
    const { productId } = useLoaderData<{ productId: string }>();
    return productId;
}
