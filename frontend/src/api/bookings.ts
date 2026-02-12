import { http } from './http';
import type { Booking } from '../types/models';

export async function createBooking(eventId: number): Promise<Booking> {
    const res = await http.post('/bookings', { eventId }); // pas de userId
    return res.data;
}

export async function myBookings(): Promise<Booking[]> {
    const res = await http.get('/bookings');
    return res.data;
}

export async function cancelBooking(id: number): Promise<Booking> {
    const res = await http.post(`/bookings/${id}/cancel`);
    return res.data;
}
