import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { useCallback, useState } from 'react';
import { useStore } from '../InnerCrovvnStore/innerCrovvnContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import InnerCrovvnMoodCard from '../InnerCrovvnComponents/InnerCrovvnMoodCard';
import { BlurView } from '@react-native-community/blur';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const InnerCrovvnGallery = () => {
  const { todaysMood, setTodaysMood, deleteCrovvnMood, setSelectedCrovvnMood } =
    useStore();
  const [isVisibleCrovvnModal, setIsVisibleCrovvnModal] = useState(false);
  const [crovvnMood, setCrovvnMood] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTodaysMood();
      loadAllMoods();
    }, []),
  );

  const getFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const loadAllMoods = async () => {
    try {
      const moodsJSON = await AsyncStorage.getItem('crovvnMoodHistory');
      const moodsArray = moodsJSON ? JSON.parse(moodsJSON) : [];
      setTodaysMood(moodsArray);

      const todayDate = getFormattedDate();
      const todayMood = moodsArray.find(item => item.date === todayDate);
      if (todayMood) setSelectedCrovvnMood(todayMood);
    } catch (error) {
      console.error('Error loading moods:', error);
    }
  };

  const loadTodaysMood = async () => {
    try {
      const moodHistoryJSON = await AsyncStorage.getItem('crovvnMoodHistory');
      const moodHistory = moodHistoryJSON ? JSON.parse(moodHistoryJSON) : [];

      const todayDate = new Date().toLocaleDateString('en-GB');
      const todayMood = moodHistory.find(item => item.date === todayDate);

      if (todayMood) {
        setTodaysMood(todayMood);
        setSelectedCrovvnMood(todayMood);
      }
    } catch (error) {
      console.error('Error loading today mood:', error);
    }
  };

  return (
    <ImmerCrovvnBackground>
      <View style={[styles.crovvnscnt]}>
        <Text
          style={[
            styles.crovvnTitle,
            Platform.OS === 'android' &&
              isVisibleCrovvnModal && { filter: 'blur(2px)' },
          ]}
        >
          Mood Journal
        </Text>

        {todaysMood.length === 0 ? (
          <>
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
                    Unfortunately, your mood journal is empty.
                  </Text>
                  <Text style={styles.crovvnduration}>
                    Mark how you feel in the Mood section — your reflection will
                    appear here once saved.
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image source={require('../../assets/images/crovvnempty.png')} />
            </View>
          </>
        ) : (
          <View
            style={
              isVisibleCrovvnModal &&
              Platform.OS === 'android' && { filter: 'blur(2px)' }
            }
          >
            {todaysMood?.map((mood, index) => (
              <InnerCrovvnMoodCard
                key={index}
                article={mood}
                setCrovvnMood={setCrovvnMood}
                isVisibleCrovvnModal={isVisibleCrovvnModal}
                setIsVisibleCrovvnModal={setIsVisibleCrovvnModal}
              />
            ))}
          </View>
        )}
      </View>

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
                    deleteCrovvnMood(crovvnMood.date);
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
    </ImmerCrovvnBackground>
  );
};

const styles = StyleSheet.create({
  crovvnscnt: {
    paddingTop: height * 0.1,
    paddingBottom: 110,
    padding: 16,
  },
  crovvnTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 30,
  },
  crovvncnt: {
    alignItems: 'center',
    padding: 20,
  },
  crovvntitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 12,
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
  crovvnheadcnt: {
    width: '100%',
    backgroundColor: 'rgba(31, 47, 121, 0.6)',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 94,
    paddingHorizontal: 30,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crovvnrectxt: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 25,
    lineHeight: 25,
  },
  crovvnsectxt: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 15,
    marginTop: 35,
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

export default InnerCrovvnGallery;
