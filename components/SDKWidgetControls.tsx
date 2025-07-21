import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Text,
} from 'react-native';

export const SDKWidgetControls = ({
  isDarkMode,
  onToggleLocale,
  onToggleTheme,
  onBack,
}: {
  isDarkMode: boolean;
  onToggleLocale: () => void;
  onToggleTheme: () => void;
  onBack: () => void;
}) => (
  <View style={styles.bar}>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={onBack} style={styles.iconButton}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Back
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleLocale} style={styles.iconButton}>
        <Image
          source={require('../assets/translate_dark.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <ThemeSwitcher isDarkMode={isDarkMode} onToggle={onToggleTheme} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    height: 30,
    marginTop: 10,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    padding: 10,
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },

  container: {
    width: 68,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    position: 'relative',
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  thumb: {
    position: 'absolute',
    top: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
    zIndex: 0,
  },
});

const ThemeSwitcher = ({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean;
  onToggle: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.9}>
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#222' : '#eee'},
        ]}>
        <View style={styles.iconWrapper}>
          <Image
            source={
              isDarkMode
                ? require('../assets/light_notselected.png')
                : require('../assets/light_selected.png')
            }
            style={{width: 20, height: 20}}
          />
        </View>
        <View style={styles.iconWrapper}>
          <Image
            source={
              isDarkMode
                ? require('../assets/dark_selected.png')
                : require('../assets/dark_notselected.png')
            }
            style={{width: 20, height: 20}}
          />
        </View>
        <Animated.View
          style={[
            styles.thumb,
            {
              left: isDarkMode ? 36 : 2,
              backgroundColor: '#ccc',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};
