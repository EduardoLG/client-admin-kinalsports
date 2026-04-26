import { useState } from "react";
import { UsuarioCard } from "./UsuarioCard";
import { UsuarioModal } from "./UsuarioModal";

const mockUsuarios = [
    { id: 1, nombre: "Admin", apellido: "Principal", username: "admin", email: "admin@ksports.local", rol: "ADMIN", activo: true },
    { id: 2, nombre: "Juan", apellido: "Pérez", username: "juanperez", email: "juan@ejemplo.com", rol: "USER", activo: true },
    { id: 3, nombre: "María", apellido: "García", username: "mariagarcia", email: "maria@ejemplo.com", rol: "USER", activo: false },
];

export const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState(mockUsuarios);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    const handleAdd = () => {
        setSelectedUsuario(null);
        setIsModalOpen(true);
    };

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setIsModalOpen(true);
    };

    const handleDelete = (usuario) => {
        if (window.confirm(`¿Eliminar al usuario "${usuario.username}"?`)) {
            setUsuarios(prev => prev.filter(u => u.id !== usuario.id));
        }
    };

    const handleSave = (data) => {
        if (selectedUsuario) {
            setUsuarios(prev => prev.map(u => u.id === selectedUsuario.id ? { ...u, ...data } : u));
        } else {
            setUsuarios(prev => [...prev, { ...data, id: Date.now() }]);
        }
    };

    const activos = usuarios.filter(u => u.activo).length;
    const admins = usuarios.filter(u => u.rol === "ADMIN").length;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {usuarios.length} {usuarios.length === 1 ? "usuario registrado" : "usuarios registrados"}
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-main-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Agregar Usuario
                </button>
            </div>

            {usuarios.length > 0 && (
                <div className="flex gap-3 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-green-600 font-semibold">{activos}</span>
                        <span className="text-green-500 ml-1">Activos</span>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-purple-600 font-semibold">{admins}</span>
                        <span className="text-purple-500 ml-1">Admins</span>
                    </div>
                    <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                        <span className="text-gray-600 font-semibold">{usuarios.length - activos}</span>
                        <span className="text-gray-500 ml-1">Inactivos</span>
                    </div>
                </div>
            )}

            {usuarios.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <p className="font-medium text-gray-500">No hay usuarios registrados</p>
                    <p className="text-sm mt-1">Agrega tu primer usuario con el botón de arriba</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuarios.map(usuario => (
                        <UsuarioCard
                            key={usuario.id}
                            usuario={usuario}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <UsuarioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                usuario={selectedUsuario}
                onSave={handleSave}
            />
        </div>
    );
};
