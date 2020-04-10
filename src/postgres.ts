import { DataTypes, Model, Sequelize } from 'sequelize'
import { BuildOptions } from 'sequelize'

import * as dotenv from 'dotenv'

dotenv.config()

export function connectDatabase() {
  return new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
  })
}

const sequelize = connectDatabase()

export async function testConnection(seq: Sequelize) {
  return await seq
    .authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.')
      return true
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
      return false
    })
}

export async function disconnectDatabase(seq: Sequelize) {
  await seq.close()
}

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
  readonly id: string
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

SessionModel.hasMany(GroupModel, { as: 'groups' })
GroupModel.belongsTo(SessionModel, { as: 'sessions' })

GroupModel.hasMany(UserModel, { as: 'users' })
UserModel.belongsTo(GroupModel, { as: 'groups' })

UserModel.sync()
GroupModel.sync()
SessionModel.sync()
