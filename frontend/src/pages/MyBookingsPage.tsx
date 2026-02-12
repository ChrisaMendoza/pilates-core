import { useEffect, useState } from 'react';
import { cancelBooking, myBookings } from '../api/bookings';
import type { Booking } from '../types/models';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const load = () => myBookings().then(setBookings);

    useEffect(() => { load(); }, []);

    const cancel = async (id: number) => {
        await cancelBooking(id);
        await load();
    };

    return (
        <div>
            <h1>Mes réservations</h1>
            <ul>
                {bookings.map(b => (
                    <li key={b.id}>
                        booking #{b.id} status {b.status} eventId {b.eventId}
                        <button onClick={() => cancel(b.id)}>Annuler</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
