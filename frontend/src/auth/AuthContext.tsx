import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccount, logout } from '../api/auth';
import type { Account } from '../types/models';

type AuthState = { account: Account | null; loading: boolean; refresh: () => Promise<void>; signOut: () => void };
const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            console.log('AuthContext: Refreshing account...');
            const acc = await getAccount();
            console.log('AuthContext: Account fetched:', acc);
            setAccount(acc);
        } catch (error) {
            console.error('AuthContext: Failed to fetch account', error);
            setAccount(null);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh().catch(() => setLoading(false));
    }, []);

    return <Ctx.Provider value={{ account, loading, refresh, signOut: () => { logout(); setAccount(null); } }}>{children}</Ctx.Provider>;
}

export function useAuth() {
    const v = useContext(Ctx);
    if (!v) throw new Error('useAuth must be used inside AuthProvider');
    return v;
}
