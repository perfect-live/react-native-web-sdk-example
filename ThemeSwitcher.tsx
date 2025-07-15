import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

interface ThemeSwitcherProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDarkMode, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.9}>
      <View style={[
        styles.container, 
        { backgroundColor: isDarkMode ? '#222' : '#eee' }]}>
        <View style={styles.iconWrapper}>
          <Image source={isDarkMode ? require('./assets/light_notselected.png') : require('./assets/light_selected.png')} 
            style={{ width: 20, height: 20 }} 
            />
        </View>
        <View style={styles.iconWrapper}>
          <Image source={ isDarkMode ? require('./assets/dark_selected.png') : require('./assets/dark_notselected.png')} 
            style={{ width: 20, height: 20 }} 
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

const styles = StyleSheet.create({
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

export default ThemeSwitcher;
