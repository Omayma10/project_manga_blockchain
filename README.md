# DEMO
Vous pouvez trouver une vidéo de démonstration ici : https://drive.google.com/file/d/1vH7p9WEMsJ1xraCI6v5TgCURrcQsLf6Z/view?usp=drive_link

# Présentation PowerPoint
Vous pouvez trouver le diapo de présentation de notre projet ici : https://www.canva.com/design/DAF6L5jVVXU/0s_uTpzlZPnXXC4i86sSSg/view?utm_content=DAF6L5jVVXU&utm_campaign=designshare&utm_medium=link&utm_source=editor

# Code pour la stéganographie et le stockage IPFS (steganofinal2.py)
## Quel est le but du code ? 

Ce code permet de prendre une image au format PNG en entrée et d'y écrire un message caché dans les pixels rouge. Le message caché permet de savoir quelle numéro d'exemplaire il s’agit, afin de retracer les leakers. Dès une copie est généré alors l’image est envoyé sur une plateforme de stockage IPFS (stockage décentralisé Filebase)
## Comment lancer le code ?

- Etape 1 : Installer Python et un IDE sur votre PC
- Etape 2 : Installer les librairies suivantes : pillow , boto3
- Etape 3 : Créer un compte sur Filebase
- Etape 4 : Modifier les variables “aws_access_key_id” et “aws_secret_access_key” avec les informations du compte
- Etape 5 : Remplacer la variable “msg” par le message que vous souhaitez cacher dans l’image
- Etape 6 : Remplacer la variable “bucket_name” par le nom de votre bucket sur filebase
- Étape 7 : Assurez vous d’avoir choisi une image dans le même dossier que le code et que celle-ci soit au format PNG
- Étape 8 : Pour lancer le code, remplacer “hunterexemplaire.png” par le nom de votre image et le “3” par le nombre d'exemplaires que vous souhaitez générer.
- Étape 9 : Si le message “c’est bon” est écrit dans la console, il ne vous reste plus qu'à rafraîchir votre page sur Filebase et vos fichiers sont disponibles ! Chaque fichier obtient un lien afin de l’afficher.


# Interagir avec le contrat
## Prérequis : 
- installer npm
- installer node
- installer Ganache
## Mode d’emploi
- Sur Remix IDE, il faut créer un nouveau contrat et copier-coller celui du mangaka.
- Compiler le contrat
- Sur Ganache, créer un nouveau workspace.
- Sur Remix IDE, choisir l’environnement “Custom - External Http Provider” puis donner l’url du serveur RPC que l’on peut trouver sur Ganache (http://localhost:7545)
- Déployer le contrat avec le premier utilisateur.
- Sur Ganache, on a une transaction de type “contract creation” qui apparaît.
- Sur Remix IDE, on peut ajouter un manga et des chapitres en utilisant les fonctions “createManga” et “addChapter”. Seul le déployeur du contrat peut faire ces deux actions.
- Aller sur le dossier “projet_manga” et exécuter la commande “node app.js”
- Sur le navigateur, ouvrir la page “http://localhost:3000”
- Le lecteur peut interagir, et les transactions seront stockées sur la blockchain.
## Le mangaka
Sur Remix IDE, le mangaka peut : 
- déployer le contrat, il lui appartient à ce moment là
- créer un manga (createManga) en spécifiant le titre (string)
- ajouter un chapitre (addChapter) en spécifiant l’id du manga auquel il veut ajouter un chapitre, le titre du chapitre, le prix (en WEI sur Remix), et la liste d’urls alloués pour ce chapitre.
- connaître la possession d’un chapitre par un utilisateur (chapterOwnership), en spécifiant l’adresse d’un utilisateur, l’id du manga et l’id du chapitre. Le résultat est “true” si l’utilisateur a bien acheté ce chapitre, “false” sinon.
- connaître l’url d’un chapitre délivré à un utilisateur (userChapterUriIndex), en spécifiant l’adresse d’un utilisateur, l’id du manga et l’id du chapitre. Le résultat est un nombre qui donne l’id du lien qui a été donné à cet utilisateur. 
## Le lecteur
Le lecteur a accès à une interface WEB sur laquelle il peut acheter n’importe quel chapitre publié par un mangaka, et ensuite accéder à sa librairie. L’interface WEB est bien sûr reliée au contrat déployé par l’auteur. En effet, dans le code de l’interface, il faut spécifier l’adresse du contrat qui a été déployé, ainsi que l’Application Binary Interface (ABI). 
Sur l’interface, il faut d’abord cliquer sur l’image du manga, puis cliquer sur “buy”. Ensuite, en haut à droite, le lecteur a accès à sa librairie avec tous les chapitres achetés. 

# Remarques
- Seul le mangaka peut créer un manga et créer des chapitres. Si un autre utilisateur essaie d’interagir avec ces 2 fonctions, alors il reçoit une erreur.
- Un utilisateur ne peut pas acheter un même chapitre en 2 exemplaires, sinon il reçoit une erreur.
- Un utilisateur ne peut pas recevoir un lien de lecture d’un chapitre sans l’avoir acheté avant.
- Lorsqu’un utilisateur achète un chapitre, il reçoit un lien qui est unique et qui lui est associé. Ainsi, si le chapitre en question se retrouve sur internet, grâce à la stéganographie, on pourra récupérer le numéro de l’exemplaire et ainsi récupérer l’utilisateur qui l’avait acheté.

