import { Client, Account, ID, Databases } from 'appwrite';
import Config from 'react-native-config';
const appwriteClient = new Client();

const APPWRITE_ENDPOINT = Config.APPWRITE_URL;
const APPWRITE_PROJECT_ID = Config.APPWRITE_PROJECT_ID;
// const DATABASE_ID = Config.DATABASE_ID;

class AppwriteService {
  account;
  database;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
    this.database = new Databases(appwriteClient);
  }
  // account
  async createAccount({ email, password, name = 'checking' }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log('Appwrite service :: createAccount() :: ' + error);
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailSession(email, password);
      const token = await this.account.createJWT();
      return {
        user,
        ...token,
      };
    } catch (error) {
      console.log('Appwrite service :: loginAccount() :: ' + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log('Appwrite service :: getCurrentAccount() :: ' + error);
    }
  }
  async getUserPreferences() {
    try {
      return await this.account.getPrefs();
    } catch (error) {
      console.log('Appwrite service :: getPreferences() :: ' + error);
    }
  }

  // database
  async getListDocument(databaseId, collectionId, queries) {
    try {
      return await this.database.listDocuments(
        databaseId,
        collectionId,
        queries,
      );
    } catch (error) {
      console.log('Appwrite service :: getDocument() :: ' + error);
    }
  }

  async createDocument(databaseId, collectionId, data) {
    try {
      return await this.database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data,
      );
    } catch (error) {
      console.log('Appwrite service :: createDocument() :: ' + error);
    }
  }

  async updateDocument(databaseId, collectionId, documentId, data) {
    try {
      return await this.database.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data,
      );
    } catch (error) {
      console.log('Appwrite service :: updateDocument() :: ' + error);
    }
  }

  async deleteDocument(databaseId, collectionId, documentId) {
    try {
      return await this.database.deleteDocument(
        databaseId,
        collectionId,
        documentId,
      );
    } catch (error) {
      console.log('Appwrite service :: deleteDocument() :: ' + error);
    }
  }
}

export default AppwriteService;
