import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

import {
    login as loginRequest
} from "../../../shared/api";


export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,

            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === "DAMIN_ROLE";

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        erro: "No tienes permiso para acceder como administrador"
                    })
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expiresAt: null,
                    isAuthenticated: false,
                })
            },

            // ----------------------------------------------------------------
            // En authStore.js
            login: async (emailOrUsername, password) => {
                try {
                    set({ loading: true, error: null });

                    // CAMBIO AQUÍ: Mapear a los nombres que espera tu API
                    const payload = {
                        EmailOrUsername: emailOrUsername,
                        Password: password
                    };

                    const { data } = await loginRequest(payload);

                    // ... resto de tu lógica de validación de rol
                    const role = data?.userDetails?.role;
                    // ... (el resto del código sigue igual)

                } catch (err) {
                    const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
                    set({ error: errorMessage, loading: false });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }
            },
            // ----------------------------------------------------------------
        }),
        { name: "auth-store" }
    )
);