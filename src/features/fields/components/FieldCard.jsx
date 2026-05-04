export const FieldCard = ({ field, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
                {field.foto ? (
                    <img src={field.foto} alt={field.nombre} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        <span className="text-xs mt-1">Sin imagen</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-base">{field.nombre}</h3>
                    <span className="text-xs bg-blue-50 text-main-blue px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2">
                        {field.tipo}
                    </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                    <p>Capacidad: <span className="text-gray-700 font-medium">{field.capacidad} personas</span></p>
                    <p>Precio: <span className="text-gray-700 font-medium">Q{field.precio}/hora</span></p>
                    <p className="text-gray-400 text-xs mt-1">ID: {field.id}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(field)}
                        className="flex-1 py-1.5 text-sm border border-main-blue text-main-blue rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(field)}
                        className="flex-1 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};
