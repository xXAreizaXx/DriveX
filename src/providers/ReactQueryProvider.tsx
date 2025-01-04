"use client";

// ReactJS
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

// Utils
import { queryClient } from "@utils/queryClient";

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const useQueryClientContext = () => useContext(QueryClientContext);

export const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <QueryClientContext.Provider value={queryClient}>
            {children}
        </QueryClientContext.Provider>
    </QueryClientProvider>
);
