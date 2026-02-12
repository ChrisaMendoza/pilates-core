import { http } from './http';
import type { Event } from '../types/models';

export async function listEvents(): Promise<Event[]> {
    const res = await http.get('/events');
    return res.data;
}
