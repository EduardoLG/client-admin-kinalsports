import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const UsuarioModal = ({ isOpen, onClose, usuario, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (usuario) {
            reset(usuario);
        } else {
            reset({ nombre: "", apellido: "", username: "", email: "", rol: "USER", activo: true });
        }
    }, [usuario, reset, isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onSave({ ...data, activo: data.activo === true || data.activo === "true" });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fadeIn">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {usuario ? "Editar Usuario" : "Nuevo Usuario"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Nombre</label>
                            <input
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Juan"
                                {...register("nombre", { required: "Requerido" })}
                            />
                            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Apellido</label>
                            <input
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Pérez"
                                {...register("apellido", { required: "Requerido" })}
                            />
                            {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Username</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="juanperez"
                            {...register("username", { required: "El username es obligatorio" })}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="juan@ejemplo.com"
                            {...register("email", { required: "El email es obligatorio" })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Rol</label>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                {...register("rol")}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Estado</label>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                {...register("activo")}
                            >
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 text-sm bg-main-blue text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-medium"
                        >
                            {usuario ? "Guardar cambios" : "Agregar usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
