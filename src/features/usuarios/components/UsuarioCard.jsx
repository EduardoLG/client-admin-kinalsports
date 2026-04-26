const roleStyles = {
    ADMIN: "bg-purple-50 text-purple-600 border-purple-200",
    USER: "bg-gray-100 text-gray-600 border-gray-200",
};

const statusStyles = {
    true: "bg-green-50 text-green-600",
    false: "bg-red-50 text-red-500",
};

export const UsuarioCard = ({ usuario, onEdit, onDelete }) => {
    const roleStyle = roleStyles[usuario.rol] || "bg-gray-100 text-gray-600 border-gray-200";
    const statusStyle = statusStyles[String(usuario.activo)] || "bg-gray-100 text-gray-500";
    const initials = `${usuario.nombre?.[0] ?? ""}${usuario.apellido?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-main-blue flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {usuario.foto ? (
                        <img src={usuario.foto} alt={usuario.nombre} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{usuario.nombre} {usuario.apellido}</h3>
                    <p className="text-xs text-gray-400 truncate">@{usuario.username}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${roleStyle} flex-shrink-0`}>
                    {usuario.rol}
                </span>
            </div>
            <div className="text-sm text-gray-500 space-y-1.5 mb-4">
                <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{usuario.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle}`}>
                        {usuario.activo ? "Activo" : "Inactivo"}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(usuario)}
                    className="flex-1 py-1.5 text-sm border border-main-blue text-main-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(usuario)}
                    className="flex-1 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};
