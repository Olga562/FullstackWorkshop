REST API WORKSHOP 05

Music API - musiikkitallenteiden luominen, lukeminen, päivittäminen ja poistaminen.

1 API ROUTE LIST
GET /api/music
[
  {
    "_id": "6635e1fe8cfc9e6b5125e5e1",
    "title": "Imagine",
    "artist": "John Lennon",
    "genre": "Rock"
  }
]

2 GET /api/music/:id
{
  "_id": "6635e1fe8cfc9e6b5125e5e1",
  "title": "Imagine",
  "artist": "John Lennon",
  "genre": "Rock"
}
 3 DELETE /api/music/:id
 {
  "message": "Kappale on poistettu"
}
