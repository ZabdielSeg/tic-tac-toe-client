# Tic tac toe game

## Frontend

This is a tic tac toe game which uses socket.io to allow a multiplayer experience. When someone signs in, a pop up will appear if more players are on the lobby. Users can accept or decline the request. Once the game starts, players need to wait for their turn to move. There's also a chat sistem where players can chat with their opponents.

## To run the project install packages

```bash
  npm i
```

After instalation, create a `.env.development` and add a variable named `REACT_APP_API_URL`. On it, you need to store your private IP address

If you are on Mac run 
```bash
  ipconfig getifaddr en0
```

For more operating systems click [here](https://www.avg.com/en/signal/find-ip-address)

The server code can be found [Here](https://github.com/ZabdielSeg/tic-tac-toe-server)

## Main routes:


|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/login` |    POST    | Log the user in|
| `/sign-up` |    POST    | Register user on Database|
| `/update-user/:userID` |    PUT    | Update user stats|
| `/all-users` |    GET    | Gets all users registrations list|

### Enjoy the game