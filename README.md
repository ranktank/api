# ranktank

The back end of Rank Tank

### Building

```bash
> npm install
```


### Running the back end

```bash
> node app
```

### How can I tell if the back end is even running?

Hit the url `http://localhost:3000/index.html` for a shiny landing page.

# API

A work in progress

## models

### tank

```js
tank: {
  title: "Tank",
  description: "This is a tank",

  items: [{
    // arbitrary props
  }, {
    ...
  }],

  // user info related to this tank
  users: [{
    user: _userId,

    // history of user in this tank
    actions: [{
      action: 'joined',
      date: new Date()
    }],

    // keeps track of item order per user
    items: [{
      item: _itemId,
      list: 'bank',
      relativePosition: 1000
    }, {
      item: _itemId,
      list: 'rank',
      relativePosition: 2000
    }, {
      ...
    }]
  }, {
    // more users
    ...
  }]
}
```

### users

```js
user: {
  firstName: 'Optimus',
  lastName: 'Prime',
  username: 'tanker1',
  email: 'prime@autobots.com',
  photo: 'url://prime.png',
  ...
}
```

## endpoints

### `GET /tanks`

Response:

```js
[{tank}, {tank}, ...]
```

### `POST /tanks`

Request:

```js
{
  title: 'Rank',
  description: 'Tank'
}
```

Response:

```js
{tank}
```

### `GET /tanks/:tankId`

Response:

```js
{tank}
```

### `PUT /tanks/:tankId`

Request:

```js
{
  title: 'New title',
  description: 'New description'
}
```

Response:

```js
{tank}
```

### `DELETE /tanks/:tankId`

Nada

### `GET /tanks/:tankId/users`

Response:

```js
[{tank.user}, {tank.user}, ...]
```

### `POST /tanks/:tankId/users`

Join a tank.

Request:

Nada

Response:

```js
{tank.user}
```

### `DELETE /tanks/:tankId/users/:userId`

Leave a tank

### `GET /tanks/:tankId/users/:userId`

Response:

```js
{tank.user}
```

### `GET /tanks/:tankId/users/:userId/items`

Response:

```js
[{tank.user.item}, {tank.user.item}, ...]
```


### `PUT /tanks/:tankId/users/:userId/items/:itemId`

Move items between lists or reorder items within a list.

Request:

```js
{
  list: 'rank',
  relativePosition: 1001
}
```

Response:

```js
{tank.user.item}
```

### `GET /tanks/:tankId/ranked`

[ranked]

### `POST /tanks/:tankId/items`

Also adds item to each user's item list.

Request:

```js
{
  // anything
}
```

Response:

```js
{item}
```

### `GET /tanks/:tankId/items`

```js
[{item}, {item}, ...]
```

### `GET /tanks/:tankId/items/:itemId`

```js
{item}
```

### `PUT /tanks/:tankId/items/:itemId`

Request:

```js
{
  // anything
}
```

Response:

```js
{item}
```

### `DELETE /tanks/:tankId/items/:itemId`

Also remove item from everyone's `userTank`

### `POST /users`

Request:

```js
{user}
```

Response:

```js
{user}
```

### `GET | PUT | DELETE /users/:userId`

CRUD on users.
