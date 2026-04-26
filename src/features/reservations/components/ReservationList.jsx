import { useState } from "react";
import { ReservationCard } from "./ReservationCard";
import { ReservationModal } from "./ReservationModal";

const mockReservations = [
    { id: 1, usuario: "Juan Pérez", canchaId: "1", horaInicio: "2026-04-26T08:00", horaFin: "2026-04-26T09:00", estado: "Confirmada", confirmacion: true },
    { id: 2, usuario: "María García", canchaId: "2", horaInicio: "2026-04-26T10:00", horaFin: "2026-04-26T11:30", estado: "Pendiente", confirmacion: false },
    { id: 3, usuario: "Carlos López", canchaId: "1", horaInicio: "2026-04-26T14:00", horaFin: "2026-04-26T15:00", estado: "Cancelada", confirmacion: false },
];

export const ReservationList = () => {
    const [reservations, setReservations] = useState(mockReservations);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleAdd = () => {
        setSelectedReservation(null);
        setIsModalOpen(true);
    };

    const handleEdit = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const handleDelete = (reservation) => {
        if (window.confirm(`¿Eliminar la reservación de "${reservation.usuario}"?`)) {
            setReservations(prev => prev.filter(r => r.id !== reservation.id));
        }
    };

    const handleSave = (data) => {
        if (selectedReservation) {
            setReservations(prev => prev.map(r => r.id === selectedReservation.id ? { ...r, ...data } : r));
        } else {
            setReservations(prev => [...prev, { ...data, id: Date.now() }]);
        }
    };

    const counts = {
        Confirmada: reservations.filter(r => r.estado === "Confirmada").length,
        Pendiente: reservations.filter(r => r.estado === "Pendiente").length,
        Cancelada: reservations.filter(r => r.estado === "Cancelada").length,
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reservaciones</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {reservations.length} {reservations.length === 1 ? "reservación registrada" : "reservaciones registradas"}
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Reservación
                </button>
            </div>

            {reservations.length > 0 && (
                <div className="flex gap-3 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-green-600 font-semibold">{counts.Confirmada}</span>
                        <span className="text-green-500 ml-1">Confirmadas</span>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-yellow-600 font-semibold">{counts.Pendiente}</span>
                        <span className="text-yellow-500 ml-1">Pendientes</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-red-500 font-semibold">{counts.Cancelada}</span>
                        <span className="text-red-400 ml-1">Canceladas</span>
                    </div>
                </div>
            )}

            {reservations.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="font-medium text-gray-500">No hay reservaciones registradas</p>
                    <p className="text-sm mt-1">Agrega tu primera reservación con el botón de arriba</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservations.map(reservation => (
                        <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <ReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reservation={selectedReservation}
                onSave={handleSave}
            />
        </div>
    );
};
