import styles from './LegalPage.module.css';

export default function CGVPage() {
    return (
        <div className={styles.container}>
            <h1>Conditions Générales de Vente (CGV)</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <section>
                <h2>1. Objet</h2>
                <p>Les présentes Conditions Générales de Vente (CGV) régissent les ventes de séances de Pilates et d'abonnements effectuées sur le site internet <strong>CORE Pilates</strong>.</p>
            </section>

            <section>
                <h2>2. Prix</h2>
                <p>Les prix de nos prestations sont indiqués en euros toutes taxes comprises (TTC). CORE Pilates se réserve le droit de modifier ses prix à tout moment, mais les prestations seront facturées sur la base des tarifs en vigueur au moment de la validation de la commande.</p>
            </section>

            <section>
                <h2>3. Commandes et Paiement</h2>
                <p>Le paiement est exigible immédiatement à la commande. Le règlement s'effectue par carte bancaire via notre système de paiement sécurisé.</p>
            </section>

            <section>
                <h2>4. Annulation et Remboursement</h2>
                <p>Toute réservation peut être annulée sans frais jusqu'à 24 heures avant le début de la séance. Passé ce délai, la séance sera décomptée de votre abonnement ou facturée.</p>
            </section>

            <section>
                <h2>5. Responsabilité</h2>
                <p>CORE Pilates ne saurait être tenue pour responsable des dommages résultant d'une mauvaise utilisation des équipements ou du non-respect des consignes de sécurité données par les instructeurs.</p>
            </section>
        </div>
    );
}
