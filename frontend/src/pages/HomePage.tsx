import styles from './HomePage.module.css';

export default function HomePage() {
    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Bienvenue !</h1>
                <p className={styles.heroSubtitle}>
                    Découvrez nos studios en plein cœur de Paris
                </p>
                <a href="#sessions" className={styles.heroCta}>
                    Découvrir nos séances
                    <span className={styles.ctaArrow}>→</span>
                </a>
            </section>

            {/* Session Description Section */}
            <section id="sessions" className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    À quoi ressemble une séance chez CORE ?
                </h2>
                <p className={styles.sectionContent}>
                    Chez CORE STUDIO, chaque session est une immersion complète - physique, sensorielle, mentale.
                </p>
                <p className={styles.sectionContent}>
                    Nous avons imaginé un entraînement où l'intensité est renouvelée.
                    Chaque mouvement est calibré pour booster le corps et déclencher un vrai changement —
                    tonifier le corps et déclencher un vrai changement — sans superflu, sans bruit inutile.
                </p>

                <div className={styles.imageGrid}>
                    <img
                        src="/src/assets/studio-interior-1.png"
                        alt="Studio CORE - Intérieur avec machines Reformer"
                        className={styles.studioImage}
                    />
                    <img
                        src="/src/assets/studio-interior-2.png"
                        alt="Studio CORE - Branding lumineux"
                        className={styles.studioImage}
                    />
                </div>
            </section>

            {/* Coach Section */}
            <section className={`${styles.section} ${styles.coachSection}`}>
                <h2 className={styles.sectionTitle}>Et nos coachs ?</h2>
                <p className={styles.sectionSubtitle}>
                    Un studio créé par vous, pour vous.
                </p>

                <div className={styles.formationGrid}>
                    <div className={styles.formationLabel}>
                        Formation
                    </div>
                    <div className={styles.formationText}>
                        <h3 style={{ marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
                            Entraînement certifié
                        </h3>
                        <p>
                            Chaque séance est soigneusement élaborée en suivant notre méthode,
                            qui garantit un encadrement personnalisé et efficace. Nos coachs, tous
                            certifiés et expérimentés, sont là pour vous accompagner à chaque
                            étape de votre parcours, en utilisant des techniques éprouvées pour
                            maximiser vos résultats et vous faire progresser de manière significative.
                            Avec leur expertise, vous pourrez maximiser vos efforts et
                            réaliser des progrès significatifs.
                        </p>
                    </div>
                </div>

                <div className={styles.formationGrid} style={{ marginTop: 'var(--spacing-xl)' }}>
                    <div className={styles.formationLabel}>
                        Deux formats, et plus...
                    </div>
                    <div className={styles.formatsList}>
                        <div className={styles.formatItem}>
                            <h4 className={styles.formatTitle}>
                                Signature Core for All
                            </h4>
                            <p className={styles.formatDescription}>
                                — pour tous les niveaux, un entraînement complet qui active tout le corps
                                (disponible en français et en anglais)
                            </p>
                        </div>
                        <div className={styles.formatItem}>
                            <h4 className={styles.formatTitle}>
                                Advanced Core
                            </h4>
                            <p className={styles.formatDescription}>
                                — pour les avancés ou ceux qui aiment les défis qui vous feront
                                ressentir intensément et en pleine forme.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.formationGrid} style={{ marginTop: 'var(--spacing-xl)' }}>
                    <div className={styles.formationLabel}>
                        Expérience sensorielle unique
                    </div>
                    <div className={styles.formationText}>
                        <p>
                            Plongez dans 50 minutes d'entraînement intensif et sans impact qui
                            vous feront vous sentir revitalisé et en pleine forme.
                        </p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className={`${styles.section} ${styles.experienceSection}`}>
                <div className={styles.experienceContent}>
                    <h2 className={styles.sectionTitle}>
                        Une expérience <span className={styles.highlight}>premium</span>
                    </h2>
                    <p className={styles.sectionContent}>
                        Découvrez un espace pensé pour votre bien-être, où chaque détail compte.
                        De l'architecture élégante aux équipements de pointe, CORE STUDIO vous offre
                        une expérience incomparable au cœur de Paris.
                    </p>
                </div>
            </section>
        </div>
    );
}
