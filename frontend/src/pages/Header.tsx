import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './Header.module.css';

type NavItem = {
    to: string;
    label: string;
};

const navItems: NavItem[] = [
    { to: '/', label: 'Accueil' },
    { to: '/planning', label: 'Planning et réservation' },
    { to: '/pricing', label: 'Tarifs et abonnement' },
];

export default function Header() {
    const { account, signOut } = useAuth();
    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link to="/" className={styles.logo}>
                    <img src="/src/assets/core-logo.png" alt="CORE" className={styles.logoIcon} />
                    <span className={styles.logoText}>CORE</span>
                </Link>

                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`${styles.navLink} ${isActive(item.to) ? styles.active : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    {account ? (
                        <>
                            <Link to="/profile" className={styles.btnOutline}>
                                Mon profil
                            </Link>
                            <button type="button" onClick={signOut} className={styles.btnSolid}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className={styles.btnOutline}>
                                S'inscrire
                            </Link>
                            <Link to="/login" className={styles.btnSolid}>
                                Connexion
                            </Link>
                        </>
                    )}
                </div>

                <button type="button" className={styles.mobileMenuButton} aria-label="Menu">
                    <div className={styles.mobileMenuIcon} />
                </button>
            </div>
        </header>
    );
}
