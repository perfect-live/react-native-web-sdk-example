import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Alert} from 'react-native';

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
  const style = useMemo(() => {
    return {
      flex: 1,
      backgroundColor: props.theme === 'dark' ? '#000' : '#fff',
    };
  }, [props.theme]);

  const onBack = props.onBack;
  const onSessionExpired = props.onSessionExpired;
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
    <WebView
      ref={webviewRef}
      source={webViewSource}
      style={style}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
      originWhitelist={['*']}
      startInLoadingState={true}
      allowsBackForwardNavigationGestures={true}
      onMessage={onPerfectLiveSDKMessage}
    />
  );
};
