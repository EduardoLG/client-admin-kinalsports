import { useState } from "react";
import { TorneoCard } from "./TorneoCard";
import { TorneoModal } from "./TorneoModal";

const mockTorneos = [
    { id: 1, nombre: "Copa Kinal 2026", deporte: "Fútbol", fechaInicio: "2026-05-01", fechaFin: "2026-05-30", equipos: 8, estado: "Próximo", descripcion: "Torneo anual de fútbol con los mejores equipos de la región." },
    { id: 2, nombre: "Liga Basketball", deporte: "Basketball", fechaInicio: "2026-03-10", fechaFin: "2026-04-20", equipos: 6, estado: "Activo", descripcion: "Liga intercolegial de basketball." },
    { id: 3, nombre: "Torneo Relámpago", deporte: "Volleyball", fechaInicio: "2026-02-01", fechaFin: "2026-02-15", equipos: 4, estado: "Finalizado", descripcion: "Torneo de eliminación directa." },
];

export const TorneoList = () => {
    const [torneos, setTorneos] = useState(mockTorneos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTorneo, setSelectedTorneo] = useState(null);

    const handleAdd = () => {
        setSelectedTorneo(null);
        setIsModalOpen(true);
    };

    const handleEdit = (torneo) => {
        setSelectedTorneo(torneo);
        setIsModalOpen(true);
    };

    const handleDelete = (torneo) => {
        if (window.confirm(`¿Eliminar el torneo "${torneo.nombre}"?`)) {
            setTorneos(prev => prev.filter(t => t.id !== torneo.id));
        }
    };

    const handleSave = (data) => {
        if (selectedTorneo) {
            setTorneos(prev => prev.map(t => t.id === selectedTorneo.id ? { ...t, ...data } : t));
        } else {
            setTorneos(prev => [...prev, { ...data, id: Date.now() }]);
        }
    };

    const counts = {
        Activo: torneos.filter(t => t.estado === "Activo").length,
        Próximo: torneos.filter(t => t.estado === "Próximo").length,
        Finalizado: torneos.filter(t => t.estado === "Finalizado").length,
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Torneos</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {torneos.length} {torneos.length === 1 ? "torneo registrado" : "torneos registrados"}
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Torneo
                </button>
            </div>

            {torneos.length > 0 && (
                <div className="flex gap-3 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-green-600 font-semibold">{counts.Activo}</span>
                        <span className="text-green-500 ml-1">Activos</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-blue-600 font-semibold">{counts.Próximo}</span>
                        <span className="text-blue-500 ml-1">Próximos</span>
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-gray-600 font-semibold">{counts.Finalizado}</span>
                        <span className="text-gray-500 ml-1">Finalizados</span>
                    </div>
                </div>
            )}

            {torneos.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                    <p className="font-medium text-gray-500">No hay torneos registrados</p>
                    <p className="text-sm mt-1">Agrega tu primer torneo con el botón de arriba</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {torneos.map(torneo => (
                        <TorneoCard
                            key={torneo.id}
                            torneo={torneo}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <TorneoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                torneo={selectedTorneo}
                onSave={handleSave}
            />
        </div>
    );
};
