const BOOKING_STORAGE_KEY = 'core_bookings';
export const BOOKINGS_UPDATED_EVENT = 'core:bookings-updated';

export type StoredBooking = {
    id: string;
    userLogin: string;
    eventId: string;
    sessionTitle: string;
    instructor: string;
    date: string;
    time: string;
    status: 'CONFIRMED';
    createdAt: string;
};

type NewBookingPayload = Omit<StoredBooking, 'id' | 'createdAt' | 'status'>;

const readBookings = (): StoredBooking[] => {
    const raw = localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const saveBookings = (bookings: StoredBooking[]) => {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent(BOOKINGS_UPDATED_EVENT));
};

const buildBookingKey = (booking: Pick<StoredBooking, 'userLogin' | 'eventId' | 'date' | 'time'>) =>
    `${booking.userLogin}:${booking.eventId}:${booking.date}:${booking.time}`;

export const getBookingsForUser = (userLogin: string): StoredBooking[] =>
    readBookings().filter((booking) => booking.userLogin === userLogin);

export const addBookingForUser = (payload: NewBookingPayload): StoredBooking => {
    const bookings = readBookings();
    const newBookingKey = buildBookingKey(payload);

    const existingBooking = bookings.find((booking) => buildBookingKey(booking) === newBookingKey);
    if (existingBooking) {
        return existingBooking;
    }

    const booking: StoredBooking = {
        ...payload,
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED',
    };

    bookings.push(booking);
    saveBookings(bookings);
    return booking;
};

export const removeBookingForUser = (bookingId: string, userLogin: string) => {
    const filtered = readBookings().filter((booking) => !(booking.id === bookingId && booking.userLogin === userLogin));
    saveBookings(filtered);
};
