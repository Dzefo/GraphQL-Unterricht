# Unterrichtsbeispiel für eine GraphQL-API mit NodeJS, Apollo und Prisma

## Was ist GraphQL
GraphQL ist eine Query Language und serverseitige Runtime für APIs. Sie ist dafür designt, APIs schneller, flexibler und Entwickler freundlicher zu machen. So wird es z.B. möglich gemacht mit einer Request Daten aus mehreren Datenbanken, oder auch verschiedenen anderen APIs auszulesen.

## Sandbox
Die Beispiel API kann im [ApolloGraphQL Studio](https://studio.apollographql.com/sandbox) in einer Sandbox ausprobiert werden. Auf der Seite muss die Sandbox Adresse https://localhost:4000 zu https://graphql.dzefo.de geändert werden.

## Query Beispiele anhand des im Unterricht entwickelten Chats

### Querys
Am besten sticht der Nutzen von GraphQL heraus, wenn man sich ein paar Beispiel Querys anschaut.

In dieser Query, wird z.B. spezifisch nur die E-Mail der User abgefragt.
```graphql
query Query {
  getAllUsers {
    email
  }
}
```
Die Response dieser Query könnte z.B. so aussehen:
```json
{
  "data": {
    "getAllUsers": [
      {
        "email": ""
      },
      {
        "email": "bergemann@buhmann.schule"
      },
      {
        "email": ""
      },
      {
        "email": "michael@mandel.dev"
      },
      {
        "email": ""
      },
      {
        "email": ""
      },
      {
        "email": ""
      },
      {
        "email": "tim.s@fdp.de"
      },
      {
        "email": "michaelmandel@fdp.de"
      },
      {
        "email": "michaelmandel@fdp.de"
      }
    ]
  }
}
```

Die gleiche Query kann aber auch z.B. alle Felder der User abfragen.
```graphql
query Query {
  getAllUsers {
    id_benutzer
    benutzername
    recht_admin
    email
    passwort_hash
  }
}
```
Die Response würde in diesem Fall so aussehen:

```json
{
  "data": {
    "getAllUsers": [
      {
        "id_benutzer": 16,
        "benutzername": "marlin",
        "recht_admin": true,
        "email": "",
        "passwort_hash": "$2y$10$icUPJeU4gumw1v3ducnAjO/KdyTtWT13hkLTZ4ALhzuXy.slVntIq"
      },
      {
        "id_benutzer": 18,
        "benutzername": "Torsten",
        "recht_admin": false,
        "email": "bergemann@buhmann.schule",
        "passwort_hash": "$2y$10$oIvG7twsIG06qNam.wPi8uYxjalEDi8AHzzBUdirGgTNHalVdqe/y"
      },
      {
        "id_benutzer": 421,
        "benutzername": "Maximilian Ludwig",
        "recht_admin": false,
        "email": "",
        "passwort_hash": "$2y$10$hoD3LPYKSoszziyKWkfZz.LMYUw62ebP0i/M6ePnq9384S2vcc0De"
      },
      {
        "id_benutzer": 425,
        "benutzername": "michael.mandel",
        "recht_admin": true,
        "email": "michael@mandel.dev",
        "passwort_hash": "$2y$2y$12$gmlyXLbkK9j641fnBsrGKegZGrCrs2IA54tQPxY10532wLqBxW4uu "
      },
      {
        "id_benutzer": 430,
        "benutzername": "Abdul",
        "recht_admin": false,
        "email": "",
        "passwort_hash": "$2y$10$Db5EBvwhL2ufWosqtXtpUunBWVxN0KWYZN.uni.E5TbqS3/uVEjBy"
      },
      {
        "id_benutzer": 431,
        "benutzername": "Abdul1",
        "recht_admin": false,
        "email": "",
        "passwort_hash": "$2y$10$JYaGcDxXn0wC3kFdOHYYGOyI4n3fFbGi2J2stfTTpJtOKg9/Ntsue"
      },
      {
        "id_benutzer": 432,
        "benutzername": "Maximilian Ludwig2",
        "recht_admin": false,
        "email": "",
        "passwort_hash": "$2y$10$bGQDbpy1V2gsYYHebztNtubYRimzfZ90O62Zxs1pOJosBovbUobqS"
      },
      {
        "id_benutzer": 433,
        "benutzername": "tim.s",
        "recht_admin": false,
        "email": "tim.s@fdp.de",
        "passwort_hash": "$2b$12$cFs9foNwV1SkCn3XIOgtfebtSE8zPXV0pE/nFyNQVyREel0MHIfoS"
      },
      {
        "id_benutzer": 434,
        "benutzername": "Tobias",
        "recht_admin": true,
        "email": "michaelmandel@fdp.de",
        "passwort_hash": "$2b$12$QgRykZ9qva19QVmNY4ViX.ew7RN0qRH4zIJSxYn36LYTHY5bqSrFi"
      },
      {
        "id_benutzer": 436,
        "benutzername": "Tobias2",
        "recht_admin": true,
        "email": "michaelmandel@fdp.de",
        "passwort_hash": "$2b$12$qbVycBfIeJlJ1NDa0b4mrOakVc9jqN6CT6SvGdiNzMSUten1D.EIm"
      }
    ]
  }
}
```
### Mutations
Neben den Querys, gibt es auch Mutations. Mutations sind dafür da, Daten zu verändern.

In diesem Beispiel wird z.B. der User Max Mustermann angelegt. Dafür müssen die Parameter, die zum erstellen benötigt werden, sowie die Felder, die zurückgegeben werden sollen, angegeben werden.
```graphql
mutation AddUserMutation {
  addUser(input: {
      benutzername: "max.mustermann",
      email: "max@mustermann.de",
      passwort: "abc123",
      recht_admin: false
    }) {
    benutzername
    email
    id_benutzer
    passwort_hash
    recht_admin
  }
}
```

Die Response dieser Mutation, gibt uns also in diesem Fall die eingegeben Daten, die zugeteilte id und den passwort_hash des Nutzers zurpück.
```json
{
  "data": {
    "addUser": {
      "benutzername": "max.mustermann",
      "email": "max@mustermann.de",
      "id_benutzer": 437,
      "passwort_hash": "$2b$12$psz.CdV2UYnJPQxuTqhnP.9LF67f28wSi19TS2QwUnfTtXrqaKg7y",
      "recht_admin": false
    }
  }
}
```
