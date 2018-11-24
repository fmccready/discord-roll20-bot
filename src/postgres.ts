const Sequelize = require('sequelize')
const Op = Sequelize.Op

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  operatorsAliases: Op,
  logging: false,
})

sequelize
  .authenticate()
  .then(() => {
    //console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

export const UserModel = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
})

export const GroupModel = sequelize.define('group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
})

export const SessionModel = sequelize.define('session', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  date: Sequelize.DATE,
})

UserModel.sync()
GroupModel.sync()
SessionModel.sync()

SessionModel.hasMany(GroupModel, { as: 'groups' })
GroupModel.belongsTo(SessionModel, { as: 'sessions' })

GroupModel.hasMany(UserModel, { as: 'users' })
UserModel.belongsTo(GroupModel, { as: 'groups' })

/*
const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});



var pgp = require('pg-promise')(/options/)
var db = pgp('postgres://username:password@host:port/database')

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
  */
