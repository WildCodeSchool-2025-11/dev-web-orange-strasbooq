import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MinimalReservationDate() {
    const today = new Date();
    const reservationDate = new Date();

    if (today.getDay() === 4) {
        reservationDate.setDate(today.getDate() + 4);
        return reservationDate;
    }
    if (today.getDay() === 5) {
        reservationDate.setDate(today.getDate() + 4);
        return reservationDate;
    }
    if (today.getDay() === 6) {
        reservationDate.setDate(today.getDate() + 3);
        return reservationDate;
    }
    else {
        reservationDate.setDate(today.getDate() + 2);
        return reservationDate;
    }
};
const isDateDisabled = ({ date, view }: { date: Date; view: string }) => {
  if (view === "month") {
    const minThresholdTimestamp = MinimalReservationDate();
        const thresholdDate = new Date(minThresholdTimestamp);
    return date < thresholdDate;
  }
  return false;
};
export default function Panier() {
    const [selectedDate, setSelectedDate] = useState<Value>(new Date());

    return (
        <>
            <main className="min-h-screen p-8 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Panier</h1>
                <h2 className="text-xl mb-6">Ma réservation</h2>

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="nom"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nom"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Votre nom"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="prenom"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Prénom
                        </label>
                        <input
                            type="text"
                            id="prenom"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Votre prénom"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <p className="block mb-4 font-bold text-gray-700">
                            Sélectionnez une date
                        </p>
                        <div className="flex justify-center bg-white p-4 rounded-xl shadow-sm border">
                            <Calendar
                                minDate={MinimalReservationDate()}
                                tileDisabled={isDateDisabled}
                                onChange={setSelectedDate}
                                value={selectedDate}
                                className="border-none"
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-600 italic">
                            Date sélectionnée :{" "}
                            {selectedDate instanceof Date
                                ? selectedDate.toLocaleDateString()
                                : "Aucune date"}
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
