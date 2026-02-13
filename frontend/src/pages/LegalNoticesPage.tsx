import styles from './LegalPage.module.css';

export default function LegalNoticesPage() {
    return (
        <div className={styles.container}>
            <h1>Mentions Légales</h1>

            <section>
                <h2>1. Éditeur du site</h2>
                <p>Le site CORE Pilates est édité par :</p>
                <ul>
                    <li><strong>Raison sociale :</strong> CORE Pilates SAS</li>
                    <li><strong>Siège social :</strong> 123 Avenue de la République, 75011 Paris, France</li>
                    <li><strong>SIRET :</strong> 123 456 789 00012</li>
                    <li><strong>Directeur de la publication :</strong> Chrisa Mendoza</li>
                    <li><strong>Contact :</strong> contact@core-pilates.com</li>
                </ul>
            </section>

            <section>
                <h2>2. Hébergement</h2>
                <p>Le site est hébergé par :</p>
                <ul>
                    <li><strong>Nom de l'hébergeur :</strong> Vercel Inc.</li>
                    <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
                </ul>
            </section>

            <section>
                <h2>3. Propriété intellectuelle</h2>
                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
            </section>
        </div>
    );
}
