import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { defaultOffer, offerCatalog } from '../data/offers';
import { addPurchaseForUser } from '../storage/purchases';
import styles from './PaymentPage.module.css';

export default function PaymentPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { account } = useAuth();
    const [isPaymentAccepted, setIsPaymentAccepted] = useState(false);
    const selectedPlan = searchParams.get('plan') ?? 'pack-20';
    const plan = offerCatalog[selectedPlan] ?? defaultOffer;

    const handlePayment = () => {
        if (!account?.login) {
            navigate('/register');
            return;
        }

        addPurchaseForUser(account.login, plan.id);
        setIsPaymentAccepted(true);
    };

    return (
        <div className={styles.page}>
            <section className={styles.container}>
                <h1>Paiement</h1>
                <p className={styles.subtitle}>Vous êtes sur le point de souscrire à l’offre suivante :</p>

                <div className={styles.summaryCard}>
                    <h2>{plan.name}</h2>
                    <p className={styles.amount}>{plan.amount}</p>
                    <p>{plan.subtitle}</p>
                </div>

                <form className={styles.form}>
                    {!account && (
                        <>
                            <h3 className={styles.formSectionTitle}>Informations personnelles</h3>
                            <div className={styles.row}>
                                <label>
                                    Prénom
                                    <input type="text" placeholder="Ex: Marie" required />
                                </label>
                                <label>
                                    Nom
                                    <input type="text" placeholder="Ex: Dupont" required />
                                </label>
                            </div>
                            <label>
                                Email
                                <input type="email" placeholder="Ex: marie.dupont@email.com" required />
                            </label>
                            <label>
                                Numéro de téléphone
                                <input type="tel" placeholder="Ex: 06 12 34 56 78" required />
                            </label>
                        </>
                    )}

                    {account && (
                        <p className={styles.connectedNotice}>
                            Vous êtes connecté(e), vos informations personnelles sont déjà enregistrées.
                        </p>
                    )}

                    <h3 className={styles.formSectionTitle}>Informations bancaires</h3>
                    <label>
                        Nom sur la carte
                        <input type="text" placeholder="Ex: Marie Dupont" required />
                    </label>
                    <label>
                        Numéro de carte
                        <input type="text" placeholder="1234 5678 9012 3456" required />
                    </label>
                    <div className={styles.row}>
                        <label>
                            Expiration
                            <input type="text" placeholder="MM/AA" required />
                        </label>
                        <label>
                            CVC
                            <input type="text" placeholder="123" required />
                        </label>
                    </div>

                    <button type="button" className={styles.payButton} onClick={handlePayment}>
                        Payer {plan.amount}
                    </button>
                </form>

                <Link to="/pricing" className={styles.backLink}>← Retour aux tarifs</Link>
            </section>

            {isPaymentAccepted && (
                <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="payment-status-title">
                    <div className={styles.modal}>
                        <h2 id="payment-status-title">Paiement accepté</h2>
                        <p>Votre offre a bien été enregistrée dans votre compte.</p>
                        <div className={styles.modalActions}>
                            <Link to="/profile" className={styles.primaryAction}>Voir mon profil</Link>
                            <button type="button" className={styles.secondaryAction} onClick={() => setIsPaymentAccepted(false)}>
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
