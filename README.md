# Générateur de Facture Proforma

Une application web moderne de génération de factures proforma construite avec Next.js, React, Tailwind CSS et `@react-pdf/renderer`.

Cette application permet de remplir un formulaire interactif avec les informations du client, les détails de la facture et les prestations offertes. Elle calcule automatiquement les montants totaux et génère un PDF prêt à être téléchargé, fidèlement reproduit à partir du design original fourni.

## Fonctionnalités

- **Formulaire interactif** : Renseignez facilement les informations du client, de la facture et ajoutez/supprimez des prestations.
- **Calculs automatiques** : Le montant de chaque ligne (Quantité * Prix unitaire - Remise) et le Total général en FCFA (XAF) sont calculés automatiquement.
- **Prévisualisation en direct** : Visualisez le rendu final du PDF en temps réel sur la page (uniquement disponible sur les grands écrans pour une meilleure lisibilité).
- **Exportation PDF** : Téléchargez la facture générée au format PDF en un clic.

## Technologies utilisées

- [Next.js](https://nextjs.org/) (React Framework)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [@react-pdf/renderer](https://react-pdf.org/) (Génération PDF côté client)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (Tests unitaires)

## Prérequis

- Node.js (v18 ou supérieur recommandé)
- npm (ou yarn / pnpm)

## Installation & Démarrage

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

3. **Construire pour la production :**
   ```bash
   npm run build
   ```

4. **Lancer la version de production :**
   ```bash
   npm start
   ```

## Tests

Ce projet inclut des tests unitaires pour garantir l'exactitude des calculs du formulaire (Totaux et Totaux généraux).

Pour lancer les tests :

```bash
npm test
```

## Structure du projet

- `src/app/page.tsx` : Point d'entrée principal de l'application. Intègre le formulaire et le module de prévisualisation PDF.
- `src/components/InvoiceForm.tsx` : Composant du formulaire avec la logique d'état et de calcul.
- `src/components/InvoicePDF.tsx` : Template du document PDF créé avec `@react-pdf/renderer`.
- `src/components/PDFPreview.tsx` : Composant Wrapper côté client pour éviter les erreurs SSR de la bibliothèque PDF.
- `src/types/invoice.ts` : Définitions des types (TypeScript).
- `src/__tests__/invoice.test.tsx` : Fichier de test unitaire.
