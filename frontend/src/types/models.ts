export type Account = {
    login: string;
    authorities: string[];
    id?: number;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
};

export type Event = { id: number; startAt: string; endAt: string; capacity: number; coachName?: string; waitlistOpen?: boolean };
export type Booking = { id: number; status?: string; eventId?: number; userId?: number; createdAt?: string; cancelledAt?: string };
