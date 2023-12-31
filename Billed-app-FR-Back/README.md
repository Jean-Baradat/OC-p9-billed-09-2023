# Billapp backend - P9 - 09/2023

## - *FR* -

> Ce projet a été récupéré d'[OpenClassrooms-Student-Center/Billed-app-FR-back](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back).

## Lancer l'API en local

#### Utiliser une version de node compatible
Si vous utilisez une version récente de node sur votre ordinateur, il se peut qu'il y ai des erreurs lors de l'installation de certaines dépendances. Pour cela il est important de vous assurer que vous ayez une version de node compatible par exemple node v16 ou v18. 

Voici quelques indications pour gérer les version de node sur votre ordinateur: 

##### Sur Windows
- Installer NVM pour windows (https://github.com/coreybutler/nvm-windows/tags)
- changer la version de node pour une version compatible (par exemple 18.16.1) pous cela suivre les instruction de NVM pour windows : 
    - `nvm install 18.16.1`
    - `nvm use 18.16.1`
- Ouvrir Powershell en mode administrateur
- Entrer la commande «  Set-ExecutionPolicy RemoteSigned » pour pouvoir gérer l’execution de scripts dans powershell
- Fermer toutes les instances de terminal

##### Sur Mac
- Installer NVM (Node Version Manager) - https://github.com/nvm-sh/nvm
- changer la version de node pour une version compatible (par exemple 18.16.1) pous cela suivre les instruction de NVM: 
    - `nvm install 18.16.1`
    - `nvm use 18.16.1`

### Acceder au repertoire du projet
```
cd Billed-app-FR-Back
```

### Installer les packages npm (décrits dans `package.json`)
```
npm i
```

### Lancer l'API
```
npm run run:dev
```

### Accéder à l'API

L'api est accessible sur le port `5678` en local, c'est à dire **[http://localhost:5678](http://localhost:5678)**

## Commandes utiles sqLite3

Commencer par accéder à la base de données :
```
sqLite3 database_dev.sqlite
```
De là, vous pouvez :
- Supprimer une facture avec son ID
```SQL
DELETE FROM Bills WHERE id = 0;
```
- Supprimer plusieurs notes de frais 
```SQL
DELETE FROM Bills WHERE id BETWEEN 0 AND 10;
```
- Quitter sqLite3
```SQL
.exit
```

Pour connaitre l'ID des notes de frais, je vous recommende :
https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer

---

## - *EN* -

> This project was taken over from [OpenClassrooms-Student-Center/Billed-app-FR-back](https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back).

## Launch the API locally

#### Use a compatible version of node
If you are using a recent version of node on your computer, you may encounter errors when installing certain dependencies. For this reason, it's important to make sure you have a compatible node version, such as node v16 or v18.

Here are some guidelines for managing node versions on your computer:

##### On Windows
- Install NVM for windows (https://github.com/coreybutler/nvm-windows/tags)
- change the node version to a compatible one (e.g. 18.16.1) follow the instructions for NVM for windows: 
    - `nvm install 18.16.1`
    - `nvm use 18.16.1`
- Open Powershell in administrator mode
- Enter "Set-ExecutionPolicy RemoteSigned" command to manage script execution in powershell
- Close all terminal instances

##### On Mac
- Install NVM (Node Version Manager) - https://github.com/nvm-sh/nvm
- change the node version to a compatible one (e.g. 18.16.1) follow the NVM instructions: 
    - `nvm install 18.16.1`
    - `nvm use 18.16.1`

### Go to the project directory
```
cd Billed-app-FR-Back
```

### Install project dependancies

```
npm i
```

### Run the API

```
npm run run:dev
```

### Access to the PAI

The API is locally available on port `5678`, go to **[http://localhost:5678](http://localhost:5678)**

## Helpful sqLite3 commands

Start by accessing the database:
```
sqLite3 database_dev.sqlite
```
From here you can:
- Delete a bill with its ID
```SQL
DELETE FROM Bills WHERE id = 0;
```
- Delete multiple bills
```SQL
DELETE FROM Bills WHERE id BETWEEN 0 AND 10;
```
- Quit sqLite3
```SQL
.exit
```

To find out the ID of your bills, I recommend:
https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer