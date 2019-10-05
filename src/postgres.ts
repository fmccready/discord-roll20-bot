import { DataTypes, Model, Sequelize } from 'sequelize'
import { BuildOptions } from 'sequelize'

import * as dotenv from 'dotenv'

dotenv.config()

/* tslint:enable:object-literal-sort-keys */
console.log(process.env.DATABASE_URL)
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
})

sequelize
  .authenticate()
  .then(() => {
    // console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAttributes
}

export interface UserAttributes extends Model {
  id?: string
  name: string
}

export const UserModel = sequelize.define('user', {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
  },
}) as UserModelStatic

type GroupModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GroupAttributes
}

export interface GroupAttributes extends Model {
  readonly id: string
  name: string
}

export const GroupModel = sequelize.define('group', {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
  },
}) as GroupModelStatic

export type SessionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SessionAttributes
}

export interface SessionAttributes extends Model {
  readonly id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export const SessionModel = sequelize.define('session', {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
  },
}) as SessionModelStatic

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
