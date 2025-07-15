import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

import { WebView } from 'react-native-webview';
import ThemeSwitcher from './ThemeSwitcher';

function App(): React.JSX.Element {
  const url = 'fill_your_url_here';
  const webviewRef = useRef<WebView>(null);
  const [locale, setLocale] = useState<'ru_RU' | 'en_US'>('en_US');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    url.toLowerCase().includes('theme=dark') ? 'dark' : 'light'
  );

  const isDarkMode = theme === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#171717' : '#FFFFFF',
  };

  const toggleLocale = () => {
    const newLocale = locale === 'en_US' ? 'ru_RU' : 'en_US';
    setLocale(newLocale);
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({ type: 'setLocale', payload: newLocale }));
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify({ type: 'setTheme', payload: newTheme }));
    }
  };
  
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{ flex: 1 }}>
        <View style={[styles.topBar, { backgroundColor: backgroundStyle.backgroundColor }]}>
          <View style={{ flex: 1 }} />
          <View style={styles.rightButtons}>
            <TouchableOpacity onPress={toggleLocale} style={styles.iconButton}>
              <Image 
                source={isDarkMode ? require('./assets/translate_dark.png') : require('./assets/translate_light.png')} 
                style={{ width: 20, height: 20 }} 
              />
            </TouchableOpacity>
            <ThemeSwitcher isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </View>
        </View>
        <WebView
          ref={webviewRef}
          source={{
            uri: url
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          originWhitelist={['*']}
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          onLoadEnd={() => {
            if (webviewRef.current) {
              webviewRef.current.injectJavaScript(`
                console.log('Page loaded!');
                true;
              `);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  headerInput: {
    flex: 1,
    minWidth: 120,
  },
  clearButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 10 : 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 22,
  },
});

export default App;
