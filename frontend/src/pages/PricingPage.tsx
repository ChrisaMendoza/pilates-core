import { Link } from 'react-router-dom';
import styles from './PricingPage.module.css';

type Offer = {
    id: string;
    name: string;
    price: string;
    cadence: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
};

const packs: Offer[] = [
    {
        id: 'pack-1',
        name: 'Séance à l’unité',
        price: '14 crédits',
        cadence: '/1 séance',
        description: 'Idéal pour tester ponctuellement le studio sans engagement.',
        features: ['1 séance = 14 crédits', 'Validité : 7 jours', 'Accès à tous les créneaux standards'],
        cta: 'Choisir Unité',
    },
    {
        id: 'pack-10',
        name: 'Pack 10 séances',
        price: '140 crédits',
        cadence: '/10 séances',
        description: 'Le format pratique pour une routine régulière.',
        features: ['Base : 1 séance = 14 crédits', 'Total : 140 crédits', 'Validité : 2 mois'],
        cta: 'Choisir Pack 10',
    },
    {
        id: 'pack-20',
        name: 'Pack 20 séances',
        price: '280 crédits',
        cadence: '/20 séances',
        description: 'Parfait pour accélérer vos résultats semaine après semaine.',
        features: ['Base : 1 séance = 14 crédits', 'Total : 280 crédits', 'Validité : 4 mois'],
        cta: 'Choisir Pack 20',
        popular: true,
    },
    {
        id: 'pack-40',
        name: 'Pack 40 séances',
        price: '560 crédits',
        cadence: '/40 séances',
        description: 'Le meilleur choix pour un entraînement intensif et durable.',
        features: ['Base : 1 séance = 14 crédits', 'Total : 560 crédits', 'Validité : 8 mois'],
        cta: 'Choisir Pack 40',
    },
];

const subscriptions: Offer[] = [
    {
        id: 'abonnement-mensuel',
        name: 'Abonnement Mensuel',
        price: '120 crédits',
        cadence: '/mois',
        description: 'Renouvellement mensuel automatique pour garder votre rythme.',
        features: ['Validité : 30 jours', 'Rechargement automatique chaque mois', 'Priorité sur liste d’attente'],
        cta: 'Choisir Mensuel',
    },
    {
        id: 'abonnement-trimestriel',
        name: 'Abonnement Trimestriel',
        price: '390 crédits',
        cadence: '/3 mois',
        description: 'Formule abonnement optimisée pour un suivi sur la durée.',
        features: ['Validité : 90 jours', 'Volume de crédits renforcé', '1 séance découverte offerte à un proche'],
        cta: 'Choisir Trimestriel',
        popular: true,
    },
];

const faqs = [
    {
        question: 'Comment sont utilisés les crédits ?',
        answer: 'La base est simple : 1 séance consomme 14 crédits, quel que soit le pack choisi.',
    },
    {
        question: 'Que se passe-t-il si la validité est dépassée ?',
        answer: 'Les crédits non utilisés expirent à la fin de la période de validité indiquée pour l’offre.',
    },
    {
        question: 'Puis-je changer de formule ?',
        answer: 'Oui, vous pouvez choisir une autre formule à la prochaine commande depuis votre espace membre.',
    },
];

function OfferSection({ title, subtitle, offers }: { title: string; subtitle: string; offers: Offer[] }) {
    return (
        <section className={styles.plansSection}>
            <div className={styles.sectionHeading}>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            <div className={styles.plansGrid}>
                {offers.map((offer) => (
                    <article key={offer.id} className={`${styles.card} ${offer.popular ? styles.popular : ''}`}>
                        {offer.popular && <span className={styles.badge}>Le plus populaire</span>}
                        <h3 className={styles.cardTitle}>{offer.name}</h3>
                        <p className={styles.price}>{offer.price}<span>{offer.cadence}</span></p>
                        <p className={styles.description}>{offer.description}</p>
                        <ul className={styles.features}>
                            {offer.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                        <Link to={`/payment?plan=${offer.id}`} className={styles.ctaButton}>{offer.cta}</Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default function PricingPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.heroKicker}>Tarifs et abonnement</p>
                <h1 className={styles.heroTitle}>Choisissez entre nos packs et abonnements</h1>
                <p className={styles.heroSubtitle}>
                    Deux rubriques distinctes pour vous aider à choisir : des packs à la séance et des abonnements avec validité définie.
                </p>
                <Link to="/" className={styles.backHomeButton}>← Revenir à l’accueil</Link>
            </section>

            <OfferSection
                title="Rubrique Pack"
                subtitle="Séance à l’unité + packs 10, 20 et 40 séances avec crédits et validité"
                offers={packs}
            />

            <OfferSection
                title="Rubrique Abonnement"
                subtitle="Deux abonnements avec durée de validité indiquée"
                offers={subscriptions}
            />

            <section className={styles.faqSection}>
                <h3>Questions fréquentes</h3>
                <div className={styles.faqList}>
                    {faqs.map((faq) => (
                        <details key={faq.question} className={styles.faqItem}>
                            <summary>{faq.question}</summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
