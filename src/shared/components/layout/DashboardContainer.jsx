import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { FieldList } from "../../../features/fields/components/FieldList";
import { ReservationList } from "../../../features/reservations/components/ReservationList";
import { EquipoList } from "../../../features/equipos/components/EquipoList";
import { TorneoList } from "../../../features/torneos/components/TorneoList";
import { UsuarioList } from "../../../features/usuarios/components/UsuarioList";

export const DashoardContainer = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Routes>
                        <Route index element={<Navigate to="canchas" replace />} />
                        <Route path="canchas" element={<FieldList />} />
                        <Route path="reservaciones" element={<ReservationList />} />
                        <Route path="equipos" element={<EquipoList />} />
                        <Route path="torneos" element={<TorneoList />} />
                        <Route path="usuarios" element={<UsuarioList />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};
