export type OfferCatalogItem = {
    id: string;
    name: string;
    amount: string;
    subtitle: string;
};

export const offerCatalog: Record<string, OfferCatalogItem> = {
    'pack-1': {
        id: 'pack-1',
        name: 'Séance à l’unité',
        amount: '14 crédits',
        subtitle: '1 séance · Validité 7 jours',
    },
    'pack-10': {
        id: 'pack-10',
        name: 'Pack 10 séances',
        amount: '140 crédits',
        subtitle: '10 séances · Validité 2 mois',
    },
    'pack-20': {
        id: 'pack-20',
        name: 'Pack 20 séances',
        amount: '280 crédits',
        subtitle: '20 séances · Validité 4 mois',
    },
    'pack-40': {
        id: 'pack-40',
        name: 'Pack 40 séances',
        amount: '560 crédits',
        subtitle: '40 séances · Validité 8 mois',
    },
    'abonnement-mensuel': {
        id: 'abonnement-mensuel',
        name: 'Abonnement Mensuel',
        amount: '120 crédits',
        subtitle: 'Validité 30 jours',
    },
    'abonnement-trimestriel': {
        id: 'abonnement-trimestriel',
        name: 'Abonnement Trimestriel',
        amount: '390 crédits',
        subtitle: 'Validité 90 jours',
    },
};

export const defaultOffer = offerCatalog['pack-20'];
