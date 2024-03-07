import { Client, Account, ID, Databases } from 'appwrite';
import Config from 'react-native-config';
const appwriteClient = new Client();

const APPWRITE_ENDPOINT = Config.APPWRITE_URL;
const APPWRITE_PROJECT_ID = Config.APPWRITE_PROJECT_ID;
console.log('APPWRITE_ENDPOINT', APPWRITE_ENDPOINT);
console.log('APPWRITE_PROJECT_ID', APPWRITE_PROJECT_ID);

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

  // database
}

export default AppwriteService;
