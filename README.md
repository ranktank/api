ranktank
========
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


# API ideas
A work in progress

## `get` `/ranks`
Ordered composite of all users' rankings.  Includes all items.

* **Option1**
```json
[
	{ "id" : "3", "title" : "c"},
	{ "id" : "1", "title" : "a"},
	{ "id" : "2", "title" : "b"},
	{ "id" : "4", "title" : "d"}
]
```
* **Option2**
```json
[
	{ "rank": "1", "id" : "3", "title" : "c"},
	{ "rank": "2", "id" : "1", "title" : "a"},
	{ "rank": "2", "id" : "2", "title" : "b"},
	{ "rank": "4", "id" : "4", "title" : "d"}
]
```

## `get`or`post`  `/ranks/user/:userId`

One user's personal ranking

lower index = higher priority

* `get` `/ranks/user/steven`
```json
[
	{ "id" : "3", "title" : "c"},
	{ "id" : "2", "title" : "b"},
	{ "id" : "1", "title" : "a"}
]
```

* `get` `/ranks/user/sam`
```json
[
	{ "id" : "3", "title" : "c"},
	{ "id" : "1", "title" : "a"},
	{ "id" : "4", "title" : "d"}
]
```



## Internal representation

What's stored in the service

```json
{
	"steven" : [
		{ "id" : "3", "title" : "c"},
		{ "id" : "2", "title" : "b"},
		{ "id" : "1", "title" : "a"}
	],
	"sam" : [
		{ "id" : "3", "title" : "c"},
		{ "id" : "1", "title" : "a"},
		{ "id" : "4", "title" : "d"}
	]
}
```
Example usage:
- `return userrankings[params.userid]`
