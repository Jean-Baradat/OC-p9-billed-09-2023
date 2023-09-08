# Billapp frontend - P9 - 09/2023

## - *FR* -

> Ce projet a été récupéré d'[OpenClassrooms-Student-Center/Billed-app-FR-Front](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front).

## Prérequis
> Ce projet, dit frontend, est connecté à un service **API backend que vous devez lancer en local avant de lancer le frontend**.
> Le projet backend se trouve ici : #
> Merci de bien vouloir suivre les instructions du README du projet backend avant de continuer la lecture de ce README.

## Architecture du projet

Pour que le projet fonctionne correctement, il faut que le projet frontend soit dans le même dossier que le projet backend. Voici la structure de dossier recommandée :

```
📂Votre dossier
 ┣ 📂Billed-app-FR-Back
 ┗ 📂Billed-app-FR-Front
```

## Lancer le frontend en local
### Rendez-vous dans le même dossier que le projet backend
```
cd #/chemin/vers/le/dossier/où/le/backend/a/été/cloné
```

### Cloner le projet
```
git clone #
```

### Allez au repo cloné
```
cd Billed-app-FR-Front
```

### Installez les packages npm (décrits dans `package.json`)
```
npm i
```

### Installez live-server pour lancer un serveur local
```
npm i -g live-server
```

### Lancez l'application
```
live-server
```
> Si votre live-server boucle sur des changes détectés (Change detected) dans le dossier node_modules. stoppez le live-server avec `ctrl + c` et utilisez la commande suivante :
```
live-server --ignore=C:\chemin\complete\vers\le\dossier\node_modules
```
> Si live-server ne fonctionne pas, vous pouvez consulter la documentation officielle : [https://www.npmjs.com/package/live-server](https://www.npmjs.com/package/live-server)

**Puis allez à l'adresse : [http://127.0.0.1:8080/](http://127.0.0.1:8080/)**

## Se connecter avec les différents types d'utilisateurs
Finalement, vous pouvez vous connecter avec les identifiants suivants et tester l'application :

##### employé
```
utilisateur : employee@test.tld
mot de passe : employee
```

##### administrateur
```
utilisateur : admin@test.tld 
mot de passe : admin
```

## Lancer un test avec Jest en local

```
npm run test
```

## Lancer un test avec Jest sur un fichier spécifique

Installez jest-cli :

```
npm i -g jest-cli
jest src/__tests__/your_test_file.js
```

## Voir le rapport de couverture visuelle des tests

rendrez-vous sur [http://127.0.0.1:8080/coverage/lcov-report/](`http://127.0.0.1:8080/coverage/lcov-report/`).

---

## - *EN* -

*Soon*
