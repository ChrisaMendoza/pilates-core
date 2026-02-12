import { useEffect, useState } from 'react';
import { listEvents } from '../api/events';
import { createBooking } from '../api/bookings';
import type { Event } from '../types/models';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listEvents().then(setEvents).catch(() => setError('Failed to load events'));
    }, []);

    const book = async (eventId: number) => {
        setError(null);
        try {
            await createBooking(eventId);
            alert('Réservation ok');
        } catch (e: any) {
            setError(e?.response?.data?.detail ?? 'Booking failed');
        }
    };

    return (
        <div>
            <h1>Events</h1>
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
            <ul>
                {events.map(ev => (
                    <li key={ev.id}>
                        #{ev.id} {ev.startAt} (cap {ev.capacity})
                        <button onClick={() => book(ev.id)}>Réserver</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
