import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const EquipoModal = ({ isOpen, onClose, equipo, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (equipo) {
            reset(equipo);
        } else {
            reset({ nombre: "", deporte: "", entrenador: "", jugadores: "", descripcion: "" });
        }
    }, [equipo, reset, isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onSave(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fadeIn">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {equipo ? "Editar Equipo" : "Nuevo Equipo"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Nombre del equipo</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. Águilas FC"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Deporte</label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            {...register("deporte", { required: "Selecciona un deporte" })}
                        >
                            <option value="">Seleccionar deporte</option>
                            <option value="Fútbol">Fútbol</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Volleyball">Volleyball</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Otro">Otro</option>
                        </select>
                        {errors.deporte && <p className="text-red-500 text-xs mt-1">{errors.deporte.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Entrenador</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nombre del entrenador"
                            {...register("entrenador", { required: "El entrenador es obligatorio" })}
                        />
                        {errors.entrenador && <p className="text-red-500 text-xs mt-1">{errors.entrenador.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Número de jugadores</label>
                        <input
                            type="number"
                            min="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="11"
                            {...register("jugadores", { required: "Requerido" })}
                        />
                        {errors.jugadores && <p className="text-red-500 text-xs mt-1">{errors.jugadores.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Descripción</label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Descripción del equipo..."
                            {...register("descripcion")}
                        />
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
                            {equipo ? "Guardar cambios" : "Agregar equipo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
