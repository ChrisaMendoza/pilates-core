import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './Header.module.css';

export default function Header() {
    const { account, signOut } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link to="/" className={styles.logo}>
                    <img
                        src="/src/assets/core-logo.png"
                        alt="CORE"
                        className={styles.logoIcon}
                    />
                    <span className={styles.logoText}>CORE</span>
                </Link>

                <nav className={styles.nav}>
                    <Link
                        to="/"
                        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/planning"
                        className={`${styles.navLink} ${isActive('/planning') ? styles.active : ''}`}
                    >
                        Planning et réservation
                    </Link>
                    <Link
                        to="/pricing"
                        className={`${styles.navLink} ${isActive('/pricing') ? styles.active : ''}`}
                    >
                        Tarifs et abonnement
                    </Link>
                </nav>

                <div className={styles.actions}>
                    {account ? (
                        <>
                            <Link to="/profile" className={styles.btnOutline}>
                                Mon compte
                            </Link>
                            <button onClick={signOut} className={styles.btnSolid}>
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

                <button className={styles.mobileMenuButton} aria-label="Menu">
                    <div className={styles.mobileMenuIcon}></div>
                </button>
            </div>
        </header>
    );
}
