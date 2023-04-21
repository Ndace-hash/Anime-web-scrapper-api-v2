# Anime Web Scrapper Api

THIS IS BUILT ON <https://github.com/kromate/Anime_web_scrapper_API> by Kromate
<br/>
IT GETS DATA FROM THE GOGO ANIMES WEBSITE

## Endpoints

### /:title

**USAGE**

```
http://localhost:3000/bleach
http://localhost:3000/vinland-saga
```

This will **GET** the anime with the given title. The title given should be the original name of the anime.

_Parameters_

- title : required

_Queries_

none

### /:title/episode

**USAGE**

```
http://localhost:3000/bleach/episode?number=7
http://localhost:3000/vinland-saga/episode?number=14
```

This will **GET** a specific episode from an anime based on the title and episode number provided.

_Parameters_

- title : required

_Queries_

- number : required

### /genres

**USAGE**

```
http://localhost:3000/genres
```

This will **GET** a list of genres.

_Parameters_

none

_Queries_

none

### /gl

**USAGE**

```
http://localhost:3000/gl?link=/genre/ecchi
http://localhost:3000/gl?link=/genre/action
```

This will **GET** a list of animes from the genre provided

_Parameters_

none

_Queries_

- link : required

### /search

**USAGE**

```
http://localhost:3000/search?keyword=jujutsu%20kaisen
http://localhost:3000/search?keyword=boku%20no%20hero
```

This will **GET** a anime list based on the keyword. the keyword should be part of the title of the anime

_Parameters_

none

_Queries_

- keyword : required
