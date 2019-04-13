# Forum

This is a basic forum website made with React and Express/Sequelize

## To run in dev environment

### API setup

1. `git clone {repository link}`
2. `cd Forum`
3. `yarn install`
4. Clone .env.example to .env
5. Fill out .env
6. Run `sequelize db:create`
7. Run `sequelize db:migrate`
8. `yarn dev`
9. Server should be running on port 3001

### Client setup

1. Open a new terminal tab
2. `cd client`
3. `yarn install`
4. `yarn start`
5. Go to http://localhost:3000
6. All set!
