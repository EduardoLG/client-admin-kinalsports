import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
export const LoginForm = ({ onForgot }) => {

    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data.emailOrUsername, data.password);
        if (res?.success) {
            navigate("/dashboard");
            toast.success("!Bienvenido de nuevo");
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Email o Usuario
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    {...register("emailOrUsername", {
                        required: "Este campo es  obligatorio"
                    })} />

            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Contrasena
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                        required: "La constrasena es obligatoria"
                    })} />

            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-main-blue hover:opacity-90
            text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                {loading ? "Iniciando..." : "Iniciar Sesion"}
            </button>
            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-main-blue hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>
        </form>

    );

}