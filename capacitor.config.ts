import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.keepup.talongroup',
  appName: 'keepup',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
