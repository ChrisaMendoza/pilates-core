import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
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

const activeOffers = [
    { title: 'Pack 20 séances', detail: '280 crédits · Validité jusqu’au 30/09/2026' },
    { title: 'Abonnement Mensuel', detail: '120 crédits · Renouvellement le 12 de chaque mois' },
];

const futureBookings = [
    'Lundi 18:30 · Signature Core for All',
    'Mercredi 12:30 · Advanced Core',
];

const pastBookings = [
    'Samedi dernier 10:00 · Signature Core for All',
    'Semaine dernière 19:30 · Advanced Core',
];

export default function ProfilePage() {
    const { account } = useAuth();

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [isEditing, setIsEditing] = useState(false);
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

    const onChange = (field: keyof ProfileData, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
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
                    {activeOffers.map((offer) => (
                        <li key={offer.title}>
                            <strong>{offer.title}</strong>
                            <span>{offer.detail}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={styles.sectionCard}>
                <h2>Mes réservations</h2>
                <div className={styles.columns}>
                    <div>
                        <h3>Futures</h3>
                        <ul className={styles.list}>
                            {futureBookings.map((booking) => <li key={booking}>{booking}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3>Passées</h3>
                        <ul className={styles.list}>
                            {pastBookings.map((booking) => <li key={booking}>{booking}</li>)}
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
