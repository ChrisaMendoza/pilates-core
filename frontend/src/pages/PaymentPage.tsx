import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styles from './PaymentPage.module.css';

type PlanContent = {
    name: string;
    amount: string;
    subtitle: string;
};

const planMapping: Record<string, PlanContent> = {
    'pack-1': {
        name: 'Séance à l’unité',
        amount: '14 crédits',
        subtitle: '1 séance · Validité 7 jours',
    },
    'pack-10': {
        name: 'Pack 10 séances',
        amount: '140 crédits',
        subtitle: '10 séances · Validité 2 mois',
    },
    'pack-20': {
        name: 'Pack 20 séances',
        amount: '280 crédits',
        subtitle: '20 séances · Validité 4 mois',
    },
    'pack-40': {
        name: 'Pack 40 séances',
        amount: '560 crédits',
        subtitle: '40 séances · Validité 8 mois',
    },
    'abonnement-mensuel': {
        name: 'Abonnement Mensuel',
        amount: '120 crédits',
        subtitle: 'Validité 30 jours',
    },
    'abonnement-trimestriel': {
        name: 'Abonnement Trimestriel',
        amount: '390 crédits',
        subtitle: 'Validité 90 jours',
    },
};

export default function PaymentPage() {
    const [searchParams] = useSearchParams();
    const { account } = useAuth();
    const selectedPlan = searchParams.get('plan') ?? 'pack-20';
    const plan = planMapping[selectedPlan] ?? planMapping['pack-20'];

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

                    <button type="button" className={styles.payButton}>
                        Payer {plan.amount}
                    </button>
                </form>

                <Link to="/pricing" className={styles.backLink}>← Retour aux tarifs</Link>
            </section>
        </div>
    );
}
