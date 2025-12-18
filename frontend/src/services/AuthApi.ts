const API_URL = "http://localhost:5000/api";

import { LoginRequest, LoginResponse } from "../types/Auth";

export const authApi = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Login failed");
        }

        return response.json();
    },
};
