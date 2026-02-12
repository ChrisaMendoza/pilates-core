import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.leftSection}>
                    <Link to="/" className={styles.logo}>
                        <img
                            src="/src/assets/core-logo.png"
                            alt="CORE"
                            className={styles.logoIcon}
                        />
                        <span className={styles.logoText}>CORE</span>
                    </Link>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactItem}>123 Avenue du Pilates, 75008 Paris</p>
                        <p className={styles.contactItem}>contact@core-pilates.fr</p>
                        <p className={styles.contactItem}>01 23 45 67 89</p>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon}>IG</a>
                        <a href="#" className={styles.socialIcon}>FB</a>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.footerLinks}>
                        <Link to="/about" className={styles.footerLink}>À propos de nous</Link>
                        <Link to="/cgv" className={styles.footerLink}>Conditions Générales de Vente</Link>
                        <Link to="/legal" className={styles.footerLink}>Mentions Légales</Link>
                        <Link to="/cookies" className={styles.footerLink}>Politique de cookies</Link>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>© {new Date().getFullYear()} CORE PILATES. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
