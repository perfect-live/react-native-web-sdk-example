import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';

import {WebView} from 'react-native-webview';

function sendEventIntoWebView(
  webviewRef: React.RefObject<WebView | null>,
  type: string,
  payload: unknown,
) {
  if (!webviewRef.current) {
    return;
  }

  webviewRef.current.postMessage(
    JSON.stringify({
      target: 'perfectLiveSdk',
      type: type,
      payload: payload,
    }),
  );
}

export type Locale = 'ru_RU' | 'en_US';
export type Theme = 'dark' | 'light';
type PerfectLiveEvent<T> = {
  source: string;
  type: string;
  payload: T;
};
export const PerfectLiveSDKWrapper = (props: {
  webViewUrl: string;
  token: string;
  theme: Theme;
  locale: Locale;
  onBack?: () => void;
  onSessionExpired: () => Promise<{token: string}>;
}) => {
  const webviewRef = useRef<WebView>(null);

  const webViewSource = useMemo(() => {
    return {
      uri: props.webViewUrl,
      headers: {
        'X-Session-Token': props.token,
      },
    };
  }, [props.webViewUrl, props.token]);
  useEffect(() => {
    sendEventIntoWebView(webviewRef, 'setTheme', props.theme);
  }, [webviewRef, props.theme]);
  useEffect(() => {
    sendEventIntoWebView(webviewRef, 'setLocale', props.locale);
  }, [webviewRef, props.locale]);

  const onBack = props.onBack;
  const onSessionExpired = props.onSessionExpired;
  const [loading, setLoading] = useState(true);
  const onPerfectLiveSDKMessage = useCallback(
    (event: any) => {
      const data = event.nativeEvent.data;
      const {source, type, payload} = JSON.parse(data) as PerfectLiveEvent<T>;
      if (source !== 'perfectLiveSdk') {
        return;
      }
      switch (type) {
        case 'closeClick':
          onBack?.();
          return;
        case 'changeNavigation':
          return;
        case 'init':
          return;
        case 'sessionExpired':
          onSessionExpired().then(({token}) => {
            Alert.alert('Session expired', 'Please, re-authenticate');
            sendEventIntoWebView(webviewRef, 'setSessionToken', token);
          });
          return;
        default:
          break;
      }
    },
    [onBack, onSessionExpired],
  );
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <WebView
        ref={webviewRef}
        source={webViewSource}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        originWhitelist={['*']}
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        onMessage={onPerfectLiveSDKMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
