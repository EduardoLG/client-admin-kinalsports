import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const ReservationModal = ({ isOpen, onClose, reservation, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (reservation) {
            reset(reservation);
        } else {
            reset({ usuario: "", canchaId: "", horaInicio: "", horaFin: "", estado: "Pendiente", confirmacion: false });
        }
    }, [reservation, reset, isOpen]);

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onSave({ ...data, confirmacion: !!data.confirmacion });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fadeIn">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {reservation ? "Editar Reservación" : "Nueva Reservación"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Usuario</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nombre del usuario"
                            {...register("usuario", { required: "El usuario es obligatorio" })}
                        />
                        {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">ID de la Cancha</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. 1"
                            {...register("canchaId", { required: "El ID de la cancha es obligatorio" })}
                        />
                        {errors.canchaId && <p className="text-red-500 text-xs mt-1">{errors.canchaId.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Hora de inicio</label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                {...register("horaInicio", { required: "Requerido" })}
                            />
                            {errors.horaInicio && <p className="text-red-500 text-xs mt-1">{errors.horaInicio.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Hora de fin</label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                {...register("horaFin", { required: "Requerido" })}
                            />
                            {errors.horaFin && <p className="text-red-500 text-xs mt-1">{errors.horaFin.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Estado</label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            {...register("estado")}
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Confirmada">Confirmada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="confirmacion"
                            className="w-4 h-4 rounded"
                            {...register("confirmacion")}
                        />
                        <label htmlFor="confirmacion" className="text-sm text-gray-700">
                            Confirmada por administrador
                        </label>
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
                            {reservation ? "Guardar cambios" : "Agregar reservación"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
