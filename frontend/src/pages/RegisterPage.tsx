import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import styles from './RegisterPage.module.css';

type RegisterFormData = {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const initialFormData: RegisterFormData = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
};

function getErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
        return error.message;
    }

    return 'Registration failed';
}

export default function RegisterPage() {
    const navigate = useNavigate();
    const { refresh } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            await register(formData);
            await login(formData.email, formData.password);
            await refresh();
            navigate('/profile', { state: { source: 'register' } });
        } catch (submitError: unknown) {
            console.error('REGISTER ERROR:', submitError);
            setError(getErrorMessage(submitError));
        }
    };

    return (
        <div className={styles.registerContainer}>
            <Link to="/" className={styles.backLink}>← Accueil</Link>

            <h1 className={styles.title}>Bienvenue !</h1>

            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="firstName" className={styles.label}>Prénom</label>
                    <input id="firstName" name="firstName" className={styles.input} value={formData.firstName} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="lastName" className={styles.label}>Nom</label>
                    <input id="lastName" name="lastName" className={styles.input} value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="birthDate" className={styles.label}>Date de naissance</label>
                    <input id="birthDate" name="birthDate" type="date" className={styles.input} value={formData.birthDate} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Mail</label>
                    <input id="email" name="email" type="email" className={styles.input} value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Téléphone</label>
                    <input id="phone" name="phone" type="tel" className={styles.input} value={formData.phone} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Mot de passe</label>
                    <input id="password" name="password" type="password" className={styles.input} value={formData.password} onChange={handleChange} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirmation de mot de passe</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" className={styles.input} value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>S'inscrire</button>
                    <Link to="/login" className={styles.loginButton}>Déjà un compte ? Connexion</Link>
                </div>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}
