![Mon Vieux Grimoire](https://www.zupimages.net/up/23/32/1ta2.png)

![](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)

### 
###
## Contexte
## _Les librairies “Au Vieux Grimoire“ comptent de nombreux clients passionnés. L’objectif du site “Mon Vieux Grimoire” est de donner la possibilité aux lecteurs de créer des livres, de les noter et de consulter les livres existants ainsi que leurs notes._

### 
###
## Scénario
## _Vous êtes développeur back-end en freelance depuis maintenant un an dans la région de Lille. Vous avez l’habitude de travailler avec Kévin, un développeur front-end plus expérimenté que vous, et qui a déjà un bon réseau de contacts dans le milieu. Kévin vous contacte pour vous proposer de travailler avec lui en mutualisant vos compétences front / back sur un tout nouveau projet qui lui a été proposé. Il s’agit d’une petite chaîne de librairies qui souhaite ouvrir un site de référencement et de notation de livres : Mon Vieux Grimoire._

### 
###
## Mission
- Créer un serveur avec Express et le connecter à une base de données MongoDB
- Développer les modèles de données et implémenter des opérations CRUD (Create, Read, Update, Delete) pour la gestion des livres et des notations
- Implémenter un système d'authentification sécurisé pour les utilisateurs du site
- Sécuriser les données
- Optimiser les images
- Respecter les bonnes pratiques du Green Code pour réduire l'empreinte écologique du site
- Utiliser Mongoose pour modéliser les données MongoDB
- Suivre une architecture MVC (Modèle-Vue-Contrôleur) pour structurer l'application


### 
###
## Objectifs pédagogiques
- Implémenter un modèle logique de données conformément à la réglementation
- Mettre en œuvre des opérations CRUD de manière sécurisée
- Stocker des données de manière sécurisée

### 
###
## Projet de base
- [Maquette Figma](https://nodejs.org/en/) 
- [Exigences de l'API](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+API.pdf) 
- [Spécifications fonctionnelles et techniques](https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/DW_P7+Back-end/DW+P7+Back-end+-+Specifications+fonctionnelles.pdf) 
- [Dépôt Github originel](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres) 


### 
###
## Installation
```sh
# Création du répertoire
mkdir projet6
cd projet6

# Récupération du projet
git clone https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres.git
mv P7-Dev-Web-livres/ monVieuxGrimoire
cd monVieuxGrimoire/
git remote set-url origin git@github.com:nicolasmorvant/projet6.git
git add .
git commit -m "Création du projet"
git push -u origin main

# Installation de npm et lancement du serveur
npm install
npm start
```

### 
###
## Ressources
- [React](https://fr.react.dev/)
- [Express](https://expressjs.com/fr/)
- [MongoDB](https://www.mongodb.com/fr-fr)
- [Node.js](https://nodejs.org/en/) 
- [NPM](https://www.npmjs.com/)


### 
###
## Cours

- [Passez au Full Stack avec Node.js, Express et MongoDB](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb) 
- [Adoptez les API REST pour vos projets web](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web) 
- [Sécurisez vos applications web avec l'OWASP](https://openclassrooms.com/fr/courses/6179306-securisez-vos-applications-web-avec-lowasp)
- [Appliquez les principes du Green IT dans votre entreprise](https://openclassrooms.com/fr/courses/6227476-appliquez-les-principes-du-green-it-dans-votre-entreprise)

### 
###
## Réalisation

| Date | Réalisation |
| ------ | ------ |
| 15/05/2024| Début du projet|

### 
###
### INSTRUCTIONS DE BASE DU README

# Mon vieux Grimoire

## Comment lancer le projet ? 

### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet. 

Le projet a été testé sur node 19. 