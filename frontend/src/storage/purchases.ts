export type PurchaseRecord = {
    planId: string;
    purchasedAt: string;
};

function purchasesKey(login: string) {
    return `pilates-core:purchases:${login}`;
}

export function getPurchasesForUser(login: string): PurchaseRecord[] {
    const raw = localStorage.getItem(purchasesKey(login));
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item): item is PurchaseRecord => {
            return typeof item === 'object'
                && item !== null
                && typeof item.planId === 'string'
                && typeof item.purchasedAt === 'string';
        });
    } catch {
        return [];
    }
}

export function addPurchaseForUser(login: string, planId: string) {
    const purchases = getPurchasesForUser(login);
    purchases.unshift({
        planId,
        purchasedAt: new Date().toISOString(),
    });

    localStorage.setItem(purchasesKey(login), JSON.stringify(purchases));
}
