import styles from './LegalPage.module.css';

export default function CookiePolicyPage() {
    return (
        <div className={styles.container}>
            <h1>Politique de Cookies</h1>

            <section>
                <h2>1. Qu'est-ce qu'un cookie ?</h2>
                <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.</p>
            </section>

            <section>
                <h2>2. Les cookies utilisés sur ce site</h2>
                <ul>
                    <li><strong>Cookies techniques :</strong> Nécessaires au bon fonctionnement du site (session utilisateur, panier d'achat). Ils ne peuvent pas être désactivés.</li>
                    <li><strong>Cookies de mesure d'audience :</strong> Nous utilisons des outils d'analyse (comme Google Analytics) pour comprendre comment les visiteurs interagissent avec le site.</li>
                </ul>
            </section>

            <section>
                <h2>3. Gestion des cookies</h2>
                <p>Vous pouvez à tout moment configurer votre navigateur pour accepter ou refuser les cookies. La désactivation des cookies techniques peut cependant altérer le fonctionnement du site.</p>
            </section>
        </div>
    );
}
