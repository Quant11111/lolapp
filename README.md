Welcome to [NOW.TS](https://nowts.app) directory.

## Setup the project

Please follow the [NOW.TS Course](https://codeline.app/courses/clqn8pmte0001lr54itcjzl59/lessons/clqn8pz990003112iia11p7uo) to setup the project.

## Contributions

Feel free to create a pull request with any changes you think valuable.

### server

start from action_workflow generated lolapp folder
the github actions should take care of the build already

pm2 start npm --name "lolapp" -- run start -- -p 3000 -H 0.0.0.0
