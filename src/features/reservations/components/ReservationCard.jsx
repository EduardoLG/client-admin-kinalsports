const statusStyles = {
    Confirmada: "bg-green-50 text-green-600 border-green-200",
    Pendiente: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Cancelada: "bg-red-50 text-red-500 border-red-200",
};

const formatDateTime = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleString("es-GT", { dateStyle: "short", timeStyle: "short" });
};

export const ReservationCard = ({ reservation, onEdit, onDelete }) => {
    const statusStyle = statusStyles[reservation.estado] || "bg-gray-50 text-gray-600 border-gray-200";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-gray-800">{reservation.usuario}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Cancha: {reservation.canchaId}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusStyle}`}>
                    {reservation.estado}
                </span>
            </div>
            <div className="text-sm text-gray-500 space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Inicio: <span className="text-gray-700 font-medium">{formatDateTime(reservation.horaInicio)}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fin: <span className="text-gray-700 font-medium">{formatDateTime(reservation.horaFin)}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Confirmada: <span className="text-gray-700 font-medium">{reservation.confirmacion ? "Sí" : "No"}</span></span>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(reservation)}
                    className="flex-1 py-1.5 text-sm border border-main-blue text-main-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(reservation)}
                    className="flex-1 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
