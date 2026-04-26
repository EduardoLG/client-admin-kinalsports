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
                const isAdmin = role === "ADMIN";

                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expiresAt: null,
                        isAuthenticated: false,
                        isLoadingAuth: false,
                        error: "No tienes permiso para acceder como administrador"
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

            login: async (emailOrUsername, password) => {
                try {
                    set({ loading: true, error: null });

                    const payload = {
                        EmailOrUsername: emailOrUsername,
                        Password: password
                    };

                    const { data } = await loginRequest(payload);

                    const role = data?.userDetails?.role;

                    if (role !== "ADMIN") {
                        set({ loading: false, error: "No tienes permiso para acceder como administrador" });
                        toast.error("No tienes permiso para acceder como administrador");
                        return { success: false };
                    }

                    set({
                        user: data.userDetails,
                        token: data.token,
                        expiresAt: data.expiresAt,
                        isAuthenticated: true,
                        loading: false,
                        error: null,
                    });

                    return { success: true };

                } catch (err) {
                    const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
                    set({ error: errorMessage, loading: false });
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }
            },
        }),
        {
            name: "auth-store",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                refreshToken: state.refreshToken,
                expiresAt: state.expiresAt,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);