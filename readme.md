# discord-roll20-bot

## Installation

### Install the bot

`git clone git@github.com:fmccready/discord-roll20-bot.git`

`npm i`

`npm i -g typescript`

### Setup local postgres database

#### Install postgres (Skip to next section if postgres is already installed)

`sudo apt install postgresql`

Set a password for the `postgres` user

`sudo passwd postgres`

Switch to `postgres` user

`su - postgres`

Login to postgres

`psql`

Change default admin password

`\password postgres`

#### Login to database

`sudo -u postgres psql`

#### Create the database

Create database and user for app

```sql
CREATE DATABASE discord_bot;
CREATE USER discord_bot_app WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE discord_bot TO discord_bot_app;
```

Verify the database was created

`\l`

Verify the user was created

`\du`

Quit postgres

`\q`

Switch back to your user

`su - yourusername`

##### Helpful postgres commands

`\l` list databases
`\c database_name` connect to database
`\dt` list tables
`\q` quit psql

### Setup environment variables

Create `.env` file with:

* `DATABASE_URL` - Postgres database URL for Sequelize constructor ex: `postgresql://username:password@localhost:5432/discord_bot`
* `CLIENT_ID` - Discord client ID
* `CLIENT_SECRET` - Discord client secret
* `TOKEN`- Discord bot token

Optional

* `PORT`- Port for web interface to listen on

### Run tests

Create test data

`npm run refresh-test-data`

Run tests!

`npm run test`
