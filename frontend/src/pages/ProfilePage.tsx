import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { offerCatalog } from '../data/offers';
import { getPurchasesForUser } from '../storage/purchases';
import { BOOKINGS_UPDATED_EVENT, getBookingsForUser, removeBookingForUser, type StoredBooking } from '../storage/booking';
import styles from './ProfilePage.module.css';

type ProfileData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    bankData: string;
};

const avatars = ['🧘', '💪', '🌸', '🔥', '✨', '🧡'];

const formatBookingLabel = (booking: StoredBooking) => {
    const dateLabel = new Date(`${booking.date}T${booking.time}`).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
    return `${dateLabel} · ${booking.time} · ${booking.sessionTitle}`;
};

export default function ProfilePage() {
    const { account } = useAuth();

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [, setBookingsVersion] = useState(0);
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: account?.firstName ?? '',
        lastName: account?.lastName ?? '',
        email: account?.login ?? '',
        phone: '',
        address: '',
        bankData: '',
    });

    const fullName = useMemo(() => {
        const composed = `${profileData.firstName} ${profileData.lastName}`.trim();
        const accountName = `${account?.firstName ?? ''} ${account?.lastName ?? ''}`.trim();
        return composed || accountName || account?.login || 'Membre CORE';
    }, [account?.firstName, account?.lastName, account?.login, profileData.firstName, profileData.lastName]);

    const firstName = profileData.firstName || account?.firstName || account?.login?.split('@')[0] || 'Membre';

    const purchases = account?.login ? getPurchasesForUser(account.login) : [];
    const bookings = account?.login ? getBookingsForUser(account.login) : [];

    useEffect(() => {
        const update = () => setBookingsVersion((current) => current + 1);
        window.addEventListener(BOOKINGS_UPDATED_EVENT, update);
        return () => window.removeEventListener(BOOKINGS_UPDATED_EVENT, update);
    }, []);

    const { upcomingBookings, previousBookings } = useMemo(() => {
        const now = new Date();
        const sorted = [...bookings].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();
            return dateA - dateB;
        });

        return {
            upcomingBookings: sorted.filter((booking) => new Date(`${booking.date}T${booking.time}`).getTime() >= now.getTime()),
            previousBookings: sorted.filter((booking) => new Date(`${booking.date}T${booking.time}`).getTime() < now.getTime()),
        };
    }, [bookings]);

    const onChange = (field: keyof ProfileData, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleCancelBooking = (booking: StoredBooking) => {
        if (!account?.login) return;

        const bookingDate = new Date(`${booking.date}T${booking.time}`);
        const now = new Date();
        const diffMs = bookingDate.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 24) {
            alert("Annulation hors délais : Cette séance a lieu dans moins de 24 heures. Si vous l'annulez maintenant, elle sera décomptée de votre forfait ou facturée.");
            return;
        }

        if (confirm("Voulez-vous vraiment annuler cette réservation ?")) {
            removeBookingForUser(booking.id, account.login);
            // Force refresh
            window.dispatchEvent(new CustomEvent(BOOKINGS_UPDATED_EVENT));
        }
    };

    return (
        <div className={styles.page}>
            <section className={styles.headerCard}>
                <div className={styles.avatarBlock}>
                    <div className={styles.avatarPreview}>{selectedAvatar}</div>
                    <div className={styles.avatarChoices}>
                        {avatars.map((avatar) => (
                            <button
                                key={avatar}
                                type="button"
                                onClick={() => setSelectedAvatar(avatar)}
                                className={`${styles.avatarButton} ${selectedAvatar === avatar ? styles.avatarSelected : ''}`}
                            >
                                {avatar}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className={styles.greeting}>{`Bienvenue, ${firstName}`}</p>
                    <h1 className={styles.name}>{fullName}</h1>
                    <p className={styles.subtle}>Votre espace profil CORE</p>
                </div>
            </section>

            <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <h2>Éditer le profil</h2>
                    <button type="button" className={styles.secondaryButton} onClick={() => setIsEditing(prev => !prev)}>
                        {isEditing ? 'Fermer' : 'Éditer le profil'}
                    </button>
                </div>

                {isEditing && (
                    <div className={styles.formGrid}>
                        <label>Prénom<input value={profileData.firstName} onChange={(e) => onChange('firstName', e.target.value)} /></label>
                        <label>Nom<input value={profileData.lastName} onChange={(e) => onChange('lastName', e.target.value)} /></label>
                        <label>Adresse e-mail<input value={profileData.email} onChange={(e) => onChange('email', e.target.value)} type="email" /></label>
                        <label>Numéro<input value={profileData.phone} onChange={(e) => onChange('phone', e.target.value)} /></label>
                        <label className={styles.fullWidth}>Adresse postale<input value={profileData.address} onChange={(e) => onChange('address', e.target.value)} /></label>
                        <label className={styles.fullWidth}>Données bancaires<input value={profileData.bankData} onChange={(e) => onChange('bankData', e.target.value)} placeholder="IBAN ou carte" /></label>
                    </div>
                )}
            </section>

            <section className={styles.sectionCard}>
                <h2>Mes packs et abonnements</h2>
                <ul className={styles.list}>
                    {purchases.length === 0 && (
                        <li>
                            <strong>Aucune offre active</strong>
                            <span>Après un paiement accepté, votre pack ou abonnement apparaîtra ici.</span>
                        </li>
                    )}
                    {purchases.map((purchase, index) => {
                        const offer = offerCatalog[purchase.planId];
                        if (!offer) return null;

                        return (
                            <li key={`${purchase.planId}-${purchase.purchasedAt}-${index}`}>
                                <strong>{offer.name}</strong>
                                <span>{offer.amount} · {offer.subtitle}</span>
                            </li>
                        );
                    })}
                    {purchases.length > 0 && (
                        <li className={styles.purchaseInfo}>Dernier achat enregistré localement sur ce navigateur.</li>
                    )}
                </ul>
            </section>

            <section className={styles.sectionCard}>
                <h2>Mes réservations</h2>
                <div className={styles.reservationsContainer}>
                    <div className={styles.reservationsSection}>
                        <h3>A venir</h3>
                        <ul className={styles.list}>
                            {upcomingBookings.length === 0 && <li>Aucune réservation future.</li>}
                            {upcomingBookings.map((booking) => (
                                <li key={booking.id} className={styles.bookingItem}>
                                    <span>{formatBookingLabel(booking)}</span>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={() => handleCancelBooking(booking)}
                                    >
                                        Annuler
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.reservationsSection}>
                        <h3>Passées</h3>
                        <ul className={styles.list}>
                            {previousBookings.length === 0 && <li>Aucune réservation passée.</li>}
                            {previousBookings.map((booking) => <li key={booking.id}>{formatBookingLabel(booking)}</li>)}
                        </ul>
                    </div>
                </div>
            </section>

            <Link to="/planning" className={styles.primaryButton}>
                Aller vers planning et réservation
            </Link>
        </div>
    );
}
