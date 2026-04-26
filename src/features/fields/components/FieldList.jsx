import { useState } from "react";
import { FieldCard } from "./FieldCard";
import { FieldModal } from "./FieldModal";

const mockFields = [
    { id: 1, nombre: "Cancha Central", tipo: "Fútbol", capacidad: 22, precio: 200, descripcion: "Cancha de césped artificial de alta calidad con iluminación nocturna." },
    { id: 2, nombre: "Cancha B", tipo: "Basketball", capacidad: 10, precio: 120, descripcion: "Techada con tableros profesionales ajustables." },
    { id: 3, nombre: "Cancha Norte", tipo: "Volleyball", capacidad: 12, precio: 100, descripcion: "Al aire libre con piso de arena y red oficial." },
];

export const FieldList = () => {
    const [fields, setFields] = useState(mockFields);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    const handleAdd = () => {
        setSelectedField(null);
        setIsModalOpen(true);
    };

    const handleEdit = (field) => {
        setSelectedField(field);
        setIsModalOpen(true);
    };

    const handleDelete = (field) => {
        if (window.confirm(`¿Estás seguro de eliminar "${field.nombre}"?`)) {
            setFields(prev => prev.filter(f => f.id !== field.id));
        }
    };

    const handleSave = (data) => {
        if (selectedField) {
            setFields(prev => prev.map(f => f.id === selectedField.id ? { ...f, ...data } : f));
        } else {
            setFields(prev => [...prev, { ...data, id: Date.now() }]);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Canchas</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {fields.length} {fields.length === 1 ? "cancha registrada" : "canchas registradas"}
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Cancha
                </button>
            </div>

            {fields.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <p className="font-medium text-gray-500">No hay canchas registradas</p>
                    <p className="text-sm mt-1">Agrega tu primera cancha con el botón de arriba</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fields.map(field => (
                        <FieldCard
                            key={field.id}
                            field={field}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <FieldModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                field={selectedField}
                onSave={handleSave}
            />
        </div>
    );
};
