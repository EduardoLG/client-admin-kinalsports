export const FieldsForm = ({ onForgot }) => {

    return (
        <form className="space-y-5">
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Nombre:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />

            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Cancha:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />
            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Capacidad:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />
            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Precio por hora:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />
            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Descripcion:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />
            </div>
            <div>
                <label htmlFor="block text-sm medium
                text-gray-800 mb-1.5">
                    Foto:
                </label>
                <input className="w-full px-3 py-2 text-sm
                border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500"
                    type="text" />
            </div>
            <button className="w-full bg-main-blue hover:opacity-90
            text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
                Guardar
            </button>
        </form>

    );

}