import { useState } from "react";
import { EquipoCard } from "./EquipoCard";
import { EquipoModal } from "./EquipoModal";

const mockEquipos = [
    { id: 1, nombre: "Águilas FC", deporte: "Fútbol", entrenador: "Carlos Mendoza", jugadores: 18, descripcion: "Equipo campeón del torneo regional 2025." },
    { id: 2, nombre: "Tigres Basketball", deporte: "Basketball", entrenador: "Ana López", jugadores: 12, descripcion: "Equipo juvenil con gran proyección." },
    { id: 3, nombre: "Volcanes Volleyball", deporte: "Volleyball", entrenador: "Roberto Díaz", jugadores: 14, descripcion: "Equipo mixto con trayectoria de 5 años." },
];

export const EquipoList = () => {
    const [equipos, setEquipos] = useState(mockEquipos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipo, setSelectedEquipo] = useState(null);

    const handleAdd = () => {
        setSelectedEquipo(null);
        setIsModalOpen(true);
    };

    const handleEdit = (equipo) => {
        setSelectedEquipo(equipo);
        setIsModalOpen(true);
    };

    const handleDelete = (equipo) => {
        if (window.confirm(`¿Eliminar el equipo "${equipo.nombre}"?`)) {
            setEquipos(prev => prev.filter(e => e.id !== equipo.id));
        }
    };

    const handleSave = (data) => {
        if (selectedEquipo) {
            setEquipos(prev => prev.map(e => e.id === selectedEquipo.id ? { ...e, ...data } : e));
        } else {
            setEquipos(prev => [...prev, { ...data, id: Date.now() }]);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Equipos</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {equipos.length} {equipos.length === 1 ? "equipo registrado" : "equipos registrados"}
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Equipo
                </button>
            </div>

            {equipos.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <p className="font-medium text-gray-500">No hay equipos registrados</p>
                    <p className="text-sm mt-1">Agrega tu primer equipo con el botón de arriba</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {equipos.map(equipo => (
                        <EquipoCard
                            key={equipo.id}
                            equipo={equipo}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <EquipoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                equipo={selectedEquipo}
                onSave={handleSave}
            />
        </div>
    );
};
