# Goomba Challenge - Documentation du Projet
### MANNOCCI MICKAËL

## Vue d'ensemble
Goomba Challenge est un jeu inspiré de l'univers Mario Bros où le joueur doit éviter des Goombas qui tombent du ciel. Le jeu est développé en JavaScript vanilla et utilise Vite comme bundler.

## Structure du Projet

### Classes Principales

#### `GameEngine`
- **Responsabilité** : Moteur principal du jeu qui coordonne tous les composants
- **Fonctionnalités** :
    - Initialise le joueur et les niveaux
    - Gère la boucle de jeu principale via `requestAnimationFrame`
    - Détecte la fin de partie et redirection vers la page Game Over
    - Gère la transition vers les niveaux suivants

#### `Player`
- **Responsabilité** : Représente le personnage contrôlé par l'utilisateur
- **Fonctionnalités** :
    - Capture les entrées clavier (touches directionnelles ou Q/D)
    - Gère les déplacements horizontaux
    - Détecte les collisions avec les Goombas
    - Gère le compteur de vies avec animation
    - Affiche l'interface visuelle des vies

#### `GoombaObstacle`
- **Responsabilité** : Représente les ennemis qui tombent du ciel
- **Fonctionnalités** :
    - Hérite de `DefaultObstacle`
    - Gère le rendu visuel des Goombas
    - Contrôle le mouvement et la vitesse de chute
    - Se recycle lorsqu'il sort de l'écran

#### `DefaultObstacle`
- **Responsabilité** : Classe de base pour tous les obstacles
- **Fonctionnalités** :
    - Définit les propriétés communes (position, vitesse, taille)
    - Gère la physique de base du mouvement
    - Rebondit sur les bords latéraux de l'écran

#### `LevelDesign` et niveaux spécifiques
- **Responsabilité** : Définit les caractéristiques de chaque niveau
- **Fonctionnalités** :
    - Configure le nombre de Goombas par niveau
    - Définit les vitesses minimale et maximale des Goombas
    - Inclut des thèmes visuels spécifiques à chaque niveau
    - Gère les animations de début de niveau

#### `GoombaManager` (Pattern Singleton)
- **Responsabilité** : Gère tous les Goombas du jeu
- **Fonctionnalités** :
    - Maintient les collections de Goombas actifs et inactifs
    - Permet de recycler les Goombas (activation/désactivation)
    - Fournit des méthodes d'accès aux Goombas actifs

#### `LevelManager` (Pattern Singleton)
- **Responsabilité** : Gère la progression entre les niveaux
- **Fonctionnalités** :
    - Maintient une référence au niveau actuel
    - Permet de passer au niveau suivant
    - Démarre avec le premier niveau (`FirstLevel`)

### Système de coordonnées et d'échelle

#### `Coordinates`
- **Responsabilité** : Encapsule les données de position et vitesse
- **Fonctionnalités** :
    - Stocke les coordonnées (x, y) et vitesses (vx, vy)
    - Permet une manipulation cohérente des positions

#### `ScaleFactor`
- **Responsabilité** : Définit les constantes de taille du jeu
- **Fonctionnalités** :
    - Maintient une taille cohérente pour les joueurs et obstacles
    - Facilite l'ajustement global des dimensions du jeu

### Système de détection de collisions

- Fonction `objectColliding` qui détecte les intersections entre le joueur et les Goombas
- Utilisée pour déterminer quand le joueur perd une vie

## Progression du Jeu

1. Le joueur commence avec 3 vies
2. Chaque niveau introduit plus de Goombas avec des vitesses croissantes:
    - Niveau 1: 10 Goombas, vitesse modérée (1.0-3.0)
    - Niveaux suivants: Plus nombreux et plus rapides
3. Une collision avec un Goomba réduit le nombre de vies de 1
4. Quand toutes les vies sont perdues, redirection vers la page Game Over
5. Quand tous les Goombas d'un niveau sont éliminés, passage au niveau suivant
6. Après le dernier niveau, redirection vers la page You Win

## Pages Spéciales

1. **Game Over** : Affichée quand le joueur n'a plus de vies
2. **You Win** : Affichée après avoir complété le dernier niveau, avec des effets spéciaux (feux d'artifice, étoiles)

## Contrôles

- Flèches Gauche/Droite ou touches Q/D pour déplacer le personnage horizontalement

## Concepts clés et Patterns de conception

1. **Architecture modulaire** : Séparation claire des responsabilités
2. **Pattern Singleton** : Pour les managers centraux (GoombaManager, LevelManager)
3. **Héritage** : Utilisation de l'héritage pour les obstacles
4. **Animations et effets visuels** : Style Mario Bros avec police pixelisée et animations caractéristiques
5. **Gestion de l'état** : Suivi des vies, des niveaux et transitions entre états du jeu

## Déploiement

Le jeu est configuré pour être déployé sur GitHub Pages.
Base URL: `/goomba-challenge/`