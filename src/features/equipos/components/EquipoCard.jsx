export const EquipoCard = ({ equipo, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="h-36 bg-gray-100 flex items-center justify-center">
                {equipo.logo ? (
                    <img src={equipo.logo} alt={equipo.nombre} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <span className="text-xs mt-1">Sin logo</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-base">{equipo.nombre}</h3>
                    <span className="text-xs bg-blue-50 text-main-blue px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
                        {equipo.deporte}
                    </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>Entrenador: <span className="text-gray-700 font-medium">{equipo.entrenador}</span></p>
                    <p>Jugadores: <span className="text-gray-700 font-medium">{equipo.jugadores}</span></p>
                    {equipo.descripcion && (
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{equipo.descripcion}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(equipo)}
                        className="flex-1 py-1.5 text-sm border border-main-blue text-main-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(equipo)}
                        className="flex-1 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};
