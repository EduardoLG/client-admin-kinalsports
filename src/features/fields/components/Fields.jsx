import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";
import { useForm } from "react-hook-form";

import { useFieldsStore } from "../../usuarios/store/adminStore.js";
import { useUIStore } from "../../auth/store/uiStore.js";

import { showError } from "../../../shared/utils/toast.js";
import { Spinner } from "../../auth/components/Spinner.jsx";
import { FieldModal } from "./FieldModal.jsx";
import { FieldCard } from "./FieldCard.jsx";

export const Fields = () => {
    const { fields, getFields, deleteField, isLoading, error } = useFieldsStore();
    const { openConfirm } = useUIStore();

    const [openModal, setOpenModal] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    // lógica original (cargar datos)
    useEffect(() => {
        getFields();
    }, [getFields]);

    // lógica de error (como el profe)
    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    return (
        <div className="p-4">
            {/* HEADER (tu diseño) */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Canchas</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {fields.length} canchas registradas
                    </p>
                </div>

                <button
                    onClick={() => {
                        setSelectedField(null);
                        setOpenModal(true);
                    }}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    + Agregar Cancha
                </button>
            </div>

            {/* LOADING (esto sí es parte de su lógica) */}
            {isLoading && <Spinner />}

            {/* GRID con tu diseño */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map((field) => (
                    <FieldCard
                        key={field._id}
                        field={{
                            id: field._id,
                            nombre: field.fieldName,
                            tipo: field.capacity,
                            capacidad: field.capacity,
                            precio: field.pricePerHour,
                            foto: field.photo,
                            descripcion: field.description,
                        }}
                        onEdit={() => {
                            setSelectedField(field);
                            setOpenModal(true);
                        }}
                        onDelete={() =>
                            openConfirm({
                                title: "Eliminar campo",
                                message: `¿Eliminar ${field.fieldName}?`,
                                onConfirm: () => deleteField(field._id),
                            })
                        }
                    />
                ))}
            </div>

            {/* MODAL (fuera del map, importante) */}
            <FieldModal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedField(null);
                }}
                field={selectedField}
            />
        </div>
    );
};