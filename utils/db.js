import { MongoClient } from 'mongodb';

const { env } = process;

class DBClient {
  constructor() {
    let host = 'localhost';
    let port = 27017;
    let database = 'files_manager';
    if (env.DB_HOST) {
      host = env.DB_HOST;
    }
    if (env.DB_PORT) {
      port = +env.DB_PORT;
    }
    if (env.DB_DATABASE) {
      database = env.DB_DATABASE;
    }

    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true, useNewUrlParser: true })
      .connect()
      .then(() => {
        this.database = this.client.db(database);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const userCount = await this.database.collection('users').countDocuments();
    return userCount;
  }

  async nbFiles() {
    const fileCount = await this.database.collection('files').countDocuments();
    return fileCount;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
