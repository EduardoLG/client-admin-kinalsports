const statusStyles = {
    Activo: "bg-green-50 text-green-600 border-green-200",
    Próximo: "bg-blue-50 text-blue-600 border-blue-200",
    Finalizado: "bg-gray-100 text-gray-500 border-gray-200",
};

const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" });
};

export const TorneoCard = ({ torneo, onEdit, onDelete }) => {
    const statusStyle = statusStyles[torneo.estado] || "bg-gray-100 text-gray-500 border-gray-200";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-gray-800 text-base">{torneo.nombre}</h3>
                    <span className="text-xs text-gray-400">{torneo.deporte}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusStyle} whitespace-nowrap ml-2`}>
                    {torneo.estado}
                </span>
            </div>
            <div className="text-sm text-gray-500 space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Inicio: <span className="text-gray-700 font-medium">{formatDate(torneo.fechaInicio)}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Fin: <span className="text-gray-700 font-medium">{formatDate(torneo.fechaFin)}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span>Equipos: <span className="text-gray-700 font-medium">{torneo.equipos}</span></span>
                </div>
                {torneo.descripcion && (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{torneo.descripcion}</p>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(torneo)}
                    className="flex-1 py-1.5 text-sm border border-main-blue text-main-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(torneo)}
                    className="flex-1 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
