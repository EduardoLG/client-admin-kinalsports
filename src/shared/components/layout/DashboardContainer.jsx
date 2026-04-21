import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar";
import { FieldsForm } from "../../../features/fields/components/FieldsForm"
import { ReservationsForm } from "../../../features/reservations/components/ReservationsForm"
export const DashoardContainer = () => {

    return (
        <div className="min-h-screen bg-gray-50
        flex flex-col">
            {/* NavBar */}
            <Navbar />
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />
                <main className="flex-1 p-6">
                    {/* Children */}
                    <FieldsForm />
                    <ReservationsForm />
                </main>
            </div>
        </div>
    );
}