# Billapp frontend - P9 - 09/2023

## - *FR* -

> Ce projet a été récupéré d'[OpenClassrooms-Student-Center/Billed-app-FR-Front](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front).

## Prérequis
> Ce projet, dit frontend, est connecté à un service **API backend que vous devez lancer en local avant de lancer le frontend**.
> Le projet backend se trouve [ici](https://github.com/Jean-Baradat/OC-p9-billed-09-2023/tree/7985c600166e876ec0db37291737b9bb333dc542/Billed-app-FR-Back).
> Merci de bien vouloir suivre les instructions du README du projet backend avant de continuer la lecture de ce README.

## Architecture du projet

Pour que le projet fonctionne correctement, il faut que le projet frontend soit dans le même dossier que le projet backend. Voici la structure de dossier recommandée :

```
📂Votre dossier
 ┣ 📂Billed-app-FR-Back
 ┗ 📂Billed-app-FR-Front
```

## Lancer le frontend en local
### Acceder au repertoire du projet
```
cd Billed-app-FR-Front
```

### Installer les packages npm (décrits dans `package.json`)
```
npm i
```

### Installer live-server pour lancer un serveur local
```
npm i -g live-server
```

### Lancez l'application
```
live-server
```
> Si votre live-server boucle sur des changements détectés (Change detected) dans le dossier node_modules. stoppez le live-server avec `ctrl + c` et utilisez la commande suivante :
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
```

Lancer le test :

```
jest src/__tests__/your_test_file.js
```

## Voir le rapport de couverture visuelle des tests

Rendrez-vous sur [http://127.0.0.1:8080/coverage/lcov-report/](`http://127.0.0.1:8080/coverage/lcov-report/`).

---

## - *EN* -

> This project was retrieved from [OpenClassrooms-Student-Center/Billed-app-FR-Front](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front).

## Requirements

> This project, known as the frontend, is connected to a backend **API service that you need to run locally before launching the frontend**.
> The backend project can be found [here](https://github.com/Jean-Baradat/OC-p9-billed-09-2023/tree/7985c600166e876ec0db37291737b9bb333dc542/Billed-app-FR-Back).
> Please follow the instructions in the README for the backend project before continuing to read this README.

## Project architecture

For the project to work properly, the frontend project must be in the same folder as the backend project. Here's the recommended folder structure:

```
📂Your file
 ┣ 📂Billed-app-FR-Back
 ┗ 📂Billed-app-FR-Front
```

## Launch the frontend locally
### Access the project directory
```
cd Billed-app-FR-Front
```

### Install npm packages (described in `package.json`)
```
npm i
```

### Install live-server to launch a local server
```
npm i -g live-server
```

### Launch application
```
live-server
```
> If your live-server loops over changes detected in the node_modules folder, stop the live-server with `ctrl + c` and use the following command:
```
live-server --ignore=C:\chemin\complete\vers\le\dossier\node_modules
```
> If live-server does not work, you can consult the official documentation: [https://www.npmjs.com/package/live-server](https://www.npmjs.com/package/live-server)

**Then go to: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)**

## Connecting with different user types
Finally, you can log in with the following credentials and test the application:

##### employee
```
user: employee@test.tld
password: employee
```

##### administrator
```
user: admin@test.tld 
password: admin
```

## Running a test with Jest locally

```
npm run test
```

## Run a test with Jest on a specific file
Install jest-cli:

```
npm i -g jest-cli
```

Start test:

```
jest src/__tests__/your_test_file.js
```

## View the visual test coverage report
Go to [http://127.0.0.1:8080/coverage/lcov-report/](`http://127.0.0.1:8080/coverage/lcov-report/`).