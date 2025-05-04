# REST API WORKSHOP 05

## Music API 
Musiikkitallenteiden luominen, lukeminen, päivittäminen ja poistaminen.
---

## API-reitit

### GET `/api/music`
Palauttaa kaikki musiikkitallenteet.
**Esimerkki vastaus:**
```json
[
  {
    "_id": "6635e1fe8cfc9e6b5125e5e1",
    "title": "Imagine",
    "artist": "John Lennon",
    "genre": "Rock"
  }
]
