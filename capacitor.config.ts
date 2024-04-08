import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ajskland.childvaccination',
  appName: 'childvaccination',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
