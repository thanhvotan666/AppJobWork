import * as Keychain from 'react-native-keychain';

export const storage = {
  // Lưu dữ liệu
  set: async (key: string = 'token',value: string) => {
    try {
      await Keychain.setGenericPassword('auth', value);
    } catch (error) {
      console.error('Error saving to Keychain:', error);
    }
  },

  // Lấy dữ liệu
  get: async (key: string = 'token') => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error reading from Keychain:', error);
      return null;
    }
  },

  // Xóa dữ liệu
  delete: async (key: string = 'token') => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error deleting from Keychain:', error);
    }
  },
};
