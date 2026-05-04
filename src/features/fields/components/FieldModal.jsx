import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFieldsStore } from "../../usuarios/store/adminStore";

import { Spinner } from "../../auth/components/Spinner";
import { useSaveField } from "../hooks/useSaveField";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const FieldModal = ({ isOpen, onClose, field, onSave }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { saveField } = useSaveField();
    const loading = useFieldsStore((state) => state.loading);

    const [preview, setPreview] = useState(null);

    // 🔄 Inicializar formulario
    useEffect(() => {
        if (isOpen) {
            if (field) {
                reset({
                    fieldName: field.fieldName,
                    fieldType: field.fieldType,
                    capacity: field.capacity,
                    pricePerHour: field.pricePerHour,
                    description: field.description,
                });
                setPreview(field.photo);
            } else {
                reset({
                    fieldName: "",
                    fieldType: "",
                    capacity: "",
                    pricePerHour: "",
                    description: "",
                });
                setPreview(null);
            }
        }
    }, [isOpen, field, reset]);

    // 🔄 Vista previa de la foto al subirla
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "photo" && value.photo && value.photo.length > 0) {
                setPreview(URL.createObjectURL(value.photo[0]));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    if (!isOpen) return null;

    // 📝 Guardar cancha (lógica del profe)
    const onSubmit = async (data) => {
        try {
            await saveField(data, field?._id);
            showSuccess(
                field
                    ? "Campo actualizado correctamente"
                    : "Campo creado correctamente",
            );
            reset();
            setPreview(null);
            onClose();
        } catch {
            showError("Error al guardar el campo");
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 animate-fadeIn">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {field ? "Editar Cancha" : "Nueva Cancha"}
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
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Nombre</label>
                        <input
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Ej. Cancha Central"
                            {...register("fieldName", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Debe contener almenos 3 caracteres"
                                }
                            })}
                        />
                        {errors.fieldName && <p className="text-red-500 text-xs mt-1">{errors.fieldName.message}</p>}
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Tipo de cancha</label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            {...register("fieldType", { required: "Selecciona un tipo" })}
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="SINTETICA">Sintetica</option>
                            <option value="CONCRETO">CONCRETO</option>
                            <option value="NATURAL">NATURAL</option>
                        </select>
                        {errors.fieldType && <p className="text-red-500 text-xs mt-1">{errors.fieldType.message}</p>}
                    </div>

                    {/* Capacidad y precio */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Capacidad</label>
                            <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                {...register("capacity", { required: "Requerido" })}
                            >
                                <option value="">Seleccionar tipo</option>
                                <option value="FUTBOL_5">FUTBOL 5</option>
                                <option value="FUTBOL_7">FUTBOL 7</option>
                                <option value="FUTBOL_11">FUTBOL 11</option>
                            </select>
                            {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1 font-medium">Precio/hora (Q)</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="150"
                                {...register("pricePerHour", {
                                    required: "El precio es obligatorio",
                                    min: { value: 1, message: "Debe ser mayor a 0" }
                                })}
                            />
                            {errors.pricePerHour && <p className="text-red-500 text-xs mt-1">{errors.pricePerHour.message}</p>}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1 font-medium">Descripción</label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Descripción de la cancha..."
                            {...register("description", { required: "La descripcion es obligatoria" })}
                        />
                        {errors.description && (
                            <p className="text-red-600 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Imagen */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700 mb-1">
                            Imagen del campo
                        </label>
                        <input
                            type="file"
                            className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition cursor-pointer"
                            accept="image/*"
                            {...register("photo")}
                        />
                    </div>


                    {/* Vista previa de foto */}
                    {preview && (
                        <div>
                            <img src={preview} alt="Vista previa" className="w-full h-40 object-cover rounded-lg" />
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setPreview(null);
                                onClose();
                            }}
                            className="flex-1 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 text-sm bg-main-blue text-white rounded-lg hover:opacity-90 transition-opacity duration-200 font-medium"
                        >
                            {loading ? (
                                <Spinner small />
                            ) : field ? (
                                "Guardar cambios"
                            ) : (
                                "Crear campo"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};