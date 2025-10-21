import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../InnerCrovvnStore/innerCrovvnContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { BlurView } from '@react-native-community/blur';

const { height } = Dimensions.get('window');

const InnerCrovvnSettings = () => {
  const [isVisibleCrovvnModal, setIsVisibleCrovvnModal] = useState(false);
  const {
    isOnMeditationsMusic,
    setIsOnMeditationsMusic,
    isOnCrovvnNotifications,
    setIsOnCrovvnNotifications,
    setSelectedCrovvnMood,
  } = useStore();

  const toggleMeditationsBgMusic = async value => {
    if (isOnCrovvnNotifications) {
      Toast.show({
        text1: !isOnMeditationsMusic ? 'Music turned on!' : 'Music turned off!',
      });
    }
    try {
      await AsyncStorage.setItem(
        'crovvnMeditationMusic',
        JSON.stringify(value),
      );
      setIsOnMeditationsMusic(value);
    } catch (error) {
      console.log('Error saving music setting:', error);
    }
  };

  const toggleCrovvnNotifications = async value => {
    Toast.show({
      text1: !isOnCrovvnNotifications
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem('crovvnnotifications', JSON.stringify(value));
      setIsOnCrovvnNotifications(value);
    } catch (error) {
      console.log('Error saving not setting:', error);
    }
  };

  const clearCrovvnJournal = async () => {
    try {
      await AsyncStorage.removeItem('crovvnMoodHistory');
      setSelectedCrovvnMood(null);
      if (isOnCrovvnNotifications) {
        Toast.show({ text1: 'Journal successfully cleared!' });
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <ImmerCrovvnBackground>
      <View
        style={[
          styles.crovvnscnt,
          Platform.OS === 'android' &&
            isVisibleCrovvnModal && { filter: 'blur(2px)' },
        ]}
      >
        <LinearGradient
          colors={[
            '#EA8115',
            '#ED2405',
            '#E2230D',
            '#941C45',
            '#1E2E78',
            '#1F2F79',
          ]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.6, y: 0.62 }}
          style={styles.crovvngradientcnt}
        >
          <View style={styles.crovvncnt}>
            <Text style={[styles.crovvntitle, { marginBottom: 13 }]}>
              Settings
            </Text>
            {Platform.OS === 'ios' && (
              <View style={styles.crovvncntwrp}>
                <Text style={styles.crovvntitle}>Sounds</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    toggleMeditationsBgMusic(!isOnMeditationsMusic)
                  }
                >
                  {isOnMeditationsMusic ? (
                    <Image
                      source={require('../../assets/images/crovvnsoundon.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/crovvnsound.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.crovvncntwrp}>
              <Text style={styles.crovvntitle}>Notifications</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  toggleCrovvnNotifications(!isOnCrovvnNotifications)
                }
              >
                {isOnCrovvnNotifications ? (
                  <Image
                    source={require('../../assets/images/crovvnnoton.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/crovvnnot.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.crovvncntwrp}>
              <Text style={styles.crovvntitle}>Clear Journal</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVisibleCrovvnModal(true)}
              >
                <Image source={require('../../assets/images/crovvnclr.png')} />
              </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' && (
              <View style={styles.crovvncntwrp}>
                <Text style={styles.crovvntitle}>Share App</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Linking.openURL(
                      'https://apps.apple.com/us/app/balance-your-inner-crovvn/id6754274650',
                    )
                  }
                >
                  <Image
                    source={require('../../assets/images/crovvnshrset.png')}
                    style={{ left: -2 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibleCrovvnModal}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              blurType="dark"
              blurAmount={4}
            />
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}
          >
            <LinearGradient
              colors={[
                '#EA8115',
                '#ED2405',
                '#E2230D',
                '#941C45',
                '#1E2E78',
                '#1F2F79',
              ]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.94, y: 0.92 }}
              style={styles.crovvngradientcnt}
            >
              <View style={styles.crovvncnt}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={styles.crovvntitle}>
                    Are you sure you want to delete this entry?
                  </Text>
                  <Text style={styles.crovvnduration}>
                    It will no longer appear in your journal.
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, marginTop: 20 }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.crovvnbtn}
                    onPress={() => {
                      setIsVisibleCrovvnModal(false);
                      clearCrovvnJournal();
                    }}
                  >
                    <Text style={styles.crovvnbtntxt}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.crovvnbtn, { backgroundColor: '#009632' }]}
                    onPress={() => setIsVisibleCrovvnModal(false)}
                  >
                    <Text style={styles.crovvnbtntxt}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    </ImmerCrovvnBackground>
  );
};

const styles = StyleSheet.create({
  crovvncnt: {
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 28,
    paddingBottom: 31,
  },
  crovvnscnt: {
    paddingTop: height * 0.08,
    padding: 16,
    paddingBottom: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  crovvncntwrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 23,
  },
  crovvntitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  crovvngradientcnt: {
    borderRadius: 12,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#fff',
  },
  crovvnduration: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
    marginTop: 8,
  },
  crovvnbtn: {
    width: 78,
    height: 30,
    backgroundColor: '#BD0000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px #00000040',
  },
  crovvnbtntxt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default InnerCrovvnSettings;
