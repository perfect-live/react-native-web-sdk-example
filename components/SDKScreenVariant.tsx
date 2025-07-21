import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Locale, PerfectLiveSDKWrapper, Theme} from './PerfectLiveSDKWrapper';
import {SDKWidgetControls} from './SDKWidgetControls';

export const SDKScreenVariant = (pr: {
  webViewUrl: string;
  token: string;
  defaultTheme: Theme;
  defaultLocale: Locale;
  onBack: () => void;
  onSessionExpired: () => Promise<{token: string}>;
}) => {
  const [theme, setTheme] = useState<Theme>(pr.defaultTheme);
  const [locale, setLocale] = useState<Locale>(pr.defaultLocale);
  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en_US' ? 'ru_RU' : 'en_US';
    setLocale(newLocale);
  }, [locale]);
  const isDarkMode = theme === 'dark';

  const toggleTheme = useCallback(() => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDarkMode]);

  return (
    <View style={styles.screen}>
      <PerfectLiveSDKWrapper
        webViewUrl={pr.webViewUrl}
        token={pr.token}
        theme={theme}
        locale={locale}
        onBack={pr.onBack}
        onSessionExpired={pr.onSessionExpired}
      />

      <SDKWidgetControls
        isDarkMode={isDarkMode}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleTheme}
        onBack={pr.onBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
