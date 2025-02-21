import { useState, useCallback, useRef } from "react";
import { urlDash } from "../tools/urlDash";

interface FetchRequest {
    url: string;
    method?: "GET" | "POST";
    body?: any;
    headers?: HeadersInit;
}

interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetchMultiple<T>() {
    const [results, setResults] = useState<Record<string, FetchResult<T>>>({});
    const [loading, setLoading] = useState(false);
    const abortControllers = useRef<Record<string, AbortController>>({});

    const fetchMultiple = useCallback(async (requests: FetchRequest[]) => {
        setLoading(true);
        const controllers: Record<string, AbortController> = {};
        const newResults: Record<string, FetchResult<T>> = {};

        try {
            const responses = await Promise.all(
                requests.map(async ({ url, method = "GET", body, headers }) => {
                    const controller = new AbortController();
                    controllers[url] = controller;

                    try {
                        const response = await fetch(url, {
                            method,
                            headers: {
                                "Content-Type": "application/json",
                                ...(headers || {}),
                            },
                            body: method === "POST" ? JSON.stringify(body) : null,
                            signal: controller.signal, // Permite abortar la petición
                        });

                        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

                        const result = await response.json();
                        return { url, data: result, error: null };
                    } catch (err) {
                        return { url, data: null, error: err instanceof Error ? err.message : "Error desconocido" };
                    }
                })
            );

            // Mapear los resultados usando `reduce` en lugar de `forEach`
            setResults((prevResults) => ({
                ...prevResults,
                ...responses.reduce((acc, { url, data, error }) => {
                    const urlKey = urlDash(url);
                    acc[urlKey] = { data, loading: false, error };
                    return acc;
                }, {} as Record<string, FetchResult<T>>),
            }));

            // Guardar controladores para abortar peticiones futuras
            abortControllers.current = controllers;
        } finally {
            setLoading(false);
        }
    }, []);

    // Cancelar solicitudes pendientes si el componente se desmonta
    const abortAllRequests = useCallback(() => {
        Object.values(abortControllers.current).forEach((controller) => controller.abort());
        abortControllers.current = {};
    }, []);

    return { results, loading, fetchMultiple, abortAllRequests };
}
