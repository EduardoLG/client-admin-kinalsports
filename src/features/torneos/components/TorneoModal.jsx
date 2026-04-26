import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const TorneoModal = ({ isOpen, onClose, torneo, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (torneo) {
            reset(torneo);
        } else {
            reset({ nombre: "", deporte: "", fechaInicio: "", fechaFin: "", equipos: "", estado: "Próximo", descripcion: "" });
        }
    }, [torneo, reset, isOpen]);

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
                        {torneo ? "Editar Torneo" : "Nuevo Torneo"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Nombre del torneo</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. Copa Kinal 2026"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Deporte</label>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                {...register("deporte", { required: "Requerido" })}
                            >
                                <option value="">Seleccionar</option>
                                <option value="Fútbol">Fútbol</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Volleyball">Volleyball</option>
                                <option value="Tennis">Tennis</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.deporte && <p className="text-red-500 text-xs mt-1">{errors.deporte.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">No. equipos</label>
                            <input
                                type="number"
                                min="2"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="8"
                                {...register("equipos", { required: "Requerido" })}
                            />
                            {errors.equipos && <p className="text-red-500 text-xs mt-1">{errors.equipos.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Fecha de inicio</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                {...register("fechaInicio", { required: "Requerido" })}
                            />
                            {errors.fechaInicio && <p className="text-red-500 text-xs mt-1">{errors.fechaInicio.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Fecha de fin</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                {...register("fechaFin", { required: "Requerido" })}
                            />
                            {errors.fechaFin && <p className="text-red-500 text-xs mt-1">{errors.fechaFin.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Estado</label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            {...register("estado")}
                        >
                            <option value="Próximo">Próximo</option>
                            <option value="Activo">Activo</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Descripción</label>
                        <textarea
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Descripción del torneo..."
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
                            {torneo ? "Guardar cambios" : "Agregar torneo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
