import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import styles from './LoginPage.module.css';



export default function LoginPage() {
    const navigate = useNavigate();
    const { refresh } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            await login(username, password);
            await refresh();
            navigate('/profile', { state: { source: 'login' } });
        } catch (submitError: unknown) {
            console.error('LOGIN ERROR:', submitError);
            setError("L'email ou le numéro de téléphone est inexistant et/ou le mot de passe est incorrect.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <Link to="/" className={styles.backLink}>
                ← Accueil
            </Link>

            <h1 className={styles.title}>Bienvenue !</h1>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>
                        Email / Numéro de téléphone
                    </label>
                    <input
                        id="username"
                        className={styles.input}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>
                        Se connecter
                    </button>
                    <Link to="/register" className={styles.registerButton}>
                        S'inscrire
                    </Link>
                </div>

            </form>
        </div>
    );
}
