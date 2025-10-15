import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import InnerCrovvnOnboardCrsl from '../InnerCrovvnComponents/InnerCrovvnOnboardCrsl';
import { useEffect, useRef, useState } from 'react';

const crovvnwelcomedta = [
  {
    id: '1',
    crovvntitle: 'Find Your Balance',
    crovvndescr:
      'Pause for a moment. Take a deep breath. This is where your path to inner calm begins — your daily space for balance and clarity.',
  },
  {
    id: '2',
    crovvntitle: 'Choose Your Mood',
    crovvndescr:
      'Each day, notice how you feel. Get gentle meditation recommendations designed to support or shift your current state.',
  },
  {
    id: '3',
    crovvntitle: 'Breathe. Focus. Release.',
    crovvndescr:
      'Short meditations for calm, focus, energy, or gratitude. All it takes is a few mindful minutes to reset your mind.',
  },
  {
    id: '4',
    crovvntitle: 'Breathe. Focus. Release.',
    crovvndescr:
      'Short meditations for calm, focus, energy, or gratitude. All it takes is a few mindful minutes to reset your mind.',
  },
];

const InnerCrovvnEntry = () => {
  const [currentCrovvnSlideIdx, setCurrentCrovvnSlideIdx] = useState(0);

  const featherFadeAnim = useRef(new Animated.Value(0)).current;
  const featherSlideAnim = useRef(new Animated.Value(-40)).current;

  const runFeatherAnim = () => {
    featherFadeAnim.setValue(0);
    featherSlideAnim.setValue(-200);

    Animated.parallel([
      Animated.timing(featherFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(featherSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    runFeatherAnim();
  }, [currentCrovvnSlideIdx]);

  return (
    <ImageBackground
      source={require('../../assets/images/crovvnonbbg.png')}
      style={styles.crovvnbackground}
    >
      <ScrollView contentContainerStyle={styles.crovvnscrollcnt}>
        <View
          style={{ justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}
        >
          <Animated.View
            style={[
              {
                opacity: featherFadeAnim,
                transform: [{ translateX: featherSlideAnim }],
              },
            ]}
          >
            {currentCrovvnSlideIdx === 0 && (
              <Image source={require('../../assets/images/crovvnonb1.png')} />
            )}
            {currentCrovvnSlideIdx === 1 && (
              <Image source={require('../../assets/images/crovvnonb2.png')} />
            )}
            {currentCrovvnSlideIdx === 2 && (
              <Image source={require('../../assets/images/crovvnonb3.png')} />
            )}
            {currentCrovvnSlideIdx === 3 && (
              <Image source={require('../../assets/images/crovvnonb4.png')} />
            )}
          </Animated.View>

          <View style={{ width: '100%' }}>
            <InnerCrovvnOnboardCrsl
              crovvnData={crovvnwelcomedta}
              setCurrentCrovvnSlideIdx={setCurrentCrovvnSlideIdx}
              currentCrovvnSlideIdx={currentCrovvnSlideIdx}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  crovvnbackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '101%',
  },
  crovvnscrollcnt: {
    flexGrow: 1,
  },
});

export default InnerCrovvnEntry;
