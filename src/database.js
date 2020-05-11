let mongoose = require('mongoose');
let accountModel = require('./schema/account');
let historyModel = require('./schema/history');
const server = '127.0.0.1:27017'
const database = 'database'

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Succesfully connected to the Mongo Database.')
      })
      .catch(err => {
        console.log('There was an issue connecting to the database, give up.')
      })
  }
}

module.exports = new Database
