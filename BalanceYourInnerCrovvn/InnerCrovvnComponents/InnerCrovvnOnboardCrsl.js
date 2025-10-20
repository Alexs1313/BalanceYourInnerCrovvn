import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  Image,
} from 'react-native';

export default function InnerCrovvnOnboardCrsl({
  crovvnData = [],
  setCurrentCrovvnSlideIdx,
  currentCrovvnSlideIdx,
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  const ITEM_WIDTH = Math.round(SCREEN_WIDTH * (isLandscape ? 0.72 : 1));
  const ITEM_SPACING = Math.round((SCREEN_WIDTH - ITEM_WIDTH) / 2.5);
  const navigation = useNavigation();

  const flatListRef = useRef();

  const dataWithExtra = [...crovvnData, { id: 'extra' }];

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.round(value / ITEM_WIDTH);

      if (index !== currentCrovvnSlideIdx) {
        setCurrentCrovvnSlideIdx(index);
      }

      if (value > (crovvnData.length - 1) * ITEM_WIDTH) {
        navigation.replace('InnerCrovvnTabs');
      }
    });

    return () => scrollX.removeListener(listener);
  }, [
    scrollX,
    ITEM_WIDTH,
    currentCrovvnSlideIdx,
    setCurrentCrovvnSlideIdx,
    navigation,
  ]);

  const renderItem = ({ item, index }) => {
    if (item.id === 'extra') {
      return <View style={{ width: ITEM_WIDTH }} />;
    }

    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [12, 0, 12],
      extrapolate: 'clamp',
    });

    return (
      <View style={{ width: ITEM_WIDTH, alignItems: 'center' }}>
        <Animated.View
          style={{
            width: ITEM_WIDTH,
            transform: [{ scale }, { translateY }],
            opacity,
          }}
        >
          <View style={styles.crovvnbrd}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.crovvntitle}>{item.crovvntitle}</Text>
              <Text style={styles.crovvnsubtitle}>{item.crovvndescr}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 22,
                justifyContent: 'center',
              }}
            >
              {crovvnData.map((_, idx) => (
                <Image
                  key={idx}
                  source={
                    currentCrovvnSlideIdx === idx
                      ? require('../../assets/images/crovvnactdot.png')
                      : require('../../assets/images/crovvninactdot.png')
                  }
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={dataWithExtra}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
      renderItem={renderItem}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  crovvnbrd: {
    borderTopLeftRadius: 50,
    width: '100%',
    backgroundColor: '#1D2D77',
    paddingBottom: 35,
    paddingTop: 89,
    paddingHorizontal: 50,
  },
  crovvnsubtitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-MediumItalic',
    marginBottom: 72,
    fontStyle: 'italic',
  },
  crovvntitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold',
    marginBottom: 36,
  },
});
