import React, {useMemo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Locale, Theme} from './components/PerfectLiveSDKWrapper';
import {SDKScreenVariant} from './components/SDKScreenVariant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#2a2a2a',

    padding: 20,
    marginVertical: 2,
    marginHorizontal: 1,
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});

const VariantItem = ({
  title,
  onTouchEnd,
}: {
  title: string;
  onTouchEnd: () => void;
}) => (
  <View style={styles.item} onTouchEnd={onTouchEnd}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
type Variant = {
  name: string;
  webViewUrl: string;
  token: string;
  defaultTheme: Theme;
  defaultLocale: Locale;
  onSessionExpired: () => Promise<{token: string}>;
};

const validSessionToken = 'BnHBKWqwi_Ojh3MkhmJMiHbyn66kTwFj';
const webViewUrl = 'https://demo.dev.perfect.live/sdk/webview';

const VariantsList = ({onSelected}: {onSelected: (item: Variant) => void}) => {
  const expiredSessionToken = 'JYek_J_9uK3oL362KjQy9nUQN_-tXBH1';
  const prolongateSession = async () => {
    return {
      token: validSessionToken,
    };
  };
  const variants = [
    {
      name: 'Threads & events Light Theme (en_US)',
      webViewUrl: webViewUrl + '?locale=en_US&theme=light&layout=all',
      token: validSessionToken,
      defaultTheme: 'light' as Theme,
      defaultLocale: 'en_US' as Locale,
      onSessionExpired: prolongateSession,
    },
    {
      name: 'Threads & events Dark Theme (ru_RU)',
      webViewUrl: webViewUrl + '?locale=ru_RU&theme=dark&layout=all',
      token: validSessionToken,
      defaultTheme: 'dark' as Theme,
      defaultLocale: 'ru_RU' as Locale,
      onSessionExpired: prolongateSession,
    },
    {
      name: 'Only threads',
      webViewUrl:
        webViewUrl +
        '?locale=en_US&theme=light&removeNavigationMenu=true&navigationResource=threads',
      token: validSessionToken,
      defaultTheme: 'light' as Theme,
      defaultLocale: 'en_US' as Locale,
      onSessionExpired: prolongateSession,
    },
    {
      name: 'Only events',
      webViewUrl:
        webViewUrl +
        '?locale=en_US&theme=light&removeNavigationMenu=true&navigationResource=events',
      token: validSessionToken,
      defaultTheme: 'light' as Theme,
      defaultLocale: 'en_US' as Locale,
      onSessionExpired: prolongateSession,
    },
    {
      name: 'Error (wrong token)',
      webViewUrl: webViewUrl + '?locale=en_US&theme=light',
      token: 'fake_token',
      defaultTheme: 'light' as Theme,
      defaultLocale: 'en_US' as Locale,
      onSessionExpired: () => {},
    },
    {
      name: 'Error: expired session',
      webViewUrl: webViewUrl + '?locale=en_US&theme=light',
      token: expiredSessionToken,
      defaultTheme: 'light' as Theme,
      defaultLocale: 'en_US' as Locale,
      onSessionExpired: prolongateSession,
    },
  ];
  return (
    <FlatList
      data={variants}
      renderItem={({item}) => (
        <VariantItem onTouchEnd={() => onSelected(item)} title={item.name} />
      )}
      keyExtractor={item => item.name}
    />
  );
};
function App(): React.JSX.Element {
  const defaultTheme: Theme = 'dark';
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const style = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: defaultTheme === 'dark' ? '#171717' : '#FFFFFF',
    };
  }, [defaultTheme]);
  return (
    <SafeAreaView style={style}>
      {selectedVariant ? (
        <SDKScreenVariant
          webViewUrl={selectedVariant.webViewUrl}
          token={selectedVariant.token}
          defaultTheme={selectedVariant.defaultTheme}
          defaultLocale={selectedVariant.defaultLocale}
          onBack={() => setSelectedVariant(null)}
          onSessionExpired={selectedVariant.onSessionExpired}
        />
      ) : (
        <VariantsList onSelected={setSelectedVariant} />
      )}
    </SafeAreaView>
  );
}

export default App;
