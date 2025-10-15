import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { useCallback } from 'react';
import { useStore } from '../InnerCrovvnStore/innerCrovvnContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { innerCrovvnMoods } from '../InnerCrovvnData/innerCrovvnMoods';
import LinearGradient from 'react-native-linear-gradient';
import InnerCrovvnListCard from '../InnerCrovvnComponents/InnerCrovvnListCard';

const { height } = Dimensions.get('window');

const InnerCrovvnMain = () => {
  const {
    setIsOnMeditationsMusic,
    setIsOnCrovvnNotifications,
    todaysMood,
    setTodaysMood,
    selectedCrovvnMood,
    setSelectedCrovvnMood,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadMeditationsBgMusic();
      loadCrovvnNotifications();
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
      console.error('Error', error);
    }
  };

  const handleMoodSelect = async mood => {
    try {
      const todayDate = getFormattedDate();

      if (todaysMood.find(item => item.date === todayDate)) {
        Alert.alert('You have already selected your mood today!');
        return;
      }

      const newMoodEntry = {
        date: todayDate,
        ...mood,
      };

      const updatedMoods = [...todaysMood, newMoodEntry];
      await AsyncStorage.setItem(
        'crovvnMoodHistory',
        JSON.stringify(updatedMoods),
      );

      setTodaysMood(updatedMoods);
      setSelectedCrovvnMood(newMoodEntry);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadMeditationsBgMusic = async () => {
    try {
      const crovvnMusicValue = await AsyncStorage.getItem(
        'crovvnMeditationMusic',
      );
      const isCrovvnMusicOn = JSON.parse(crovvnMusicValue);
      setIsOnMeditationsMusic(isCrovvnMusicOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadCrovvnNotifications = async () => {
    try {
      const crovvnNotifValue = await AsyncStorage.getItem(
        'crovvnnotifications',
      );
      if (crovvnNotifValue !== null) {
        const isCrovvnNotOn = JSON.parse(crovvnNotifValue);
        setIsOnCrovvnNotifications(isCrovvnNotOn);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <ImmerCrovvnBackground>
      {selectedCrovvnMood ? (
        <View>
          <View style={styles.crovvnheadcnt}>
            <Text style={styles.crovvnrectxt}>
              {selectedCrovvnMood.crovvnrec}
            </Text>
            <Image source={selectedCrovvnMood.crovvnimage} />
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 110 }}>
            <Text style={styles.crovvnsectxt}>Recommended Meditations:</Text>
            {selectedCrovvnMood.crovvnsuggest?.map((article, index) => (
              <InnerCrovvnListCard key={index} article={article} meditations />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.crovvnscnt}>
          <Text style={styles.crovvnTitle}>
            Welcome. How is your inner world today?
          </Text>
          {innerCrovvnMoods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleMoodSelect(mood)}
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
                  <Image source={mood.crovvnimage} />
                  <View
                    style={{
                      alignItems: 'center',
                      width: '70%',
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={styles.crovvntitle}>{mood.crovvntitle}</Text>
                    <Text style={styles.crovvnduration}>
                      {mood.crovvndescr}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ImmerCrovvnBackground>
  );
};

const styles = StyleSheet.create({
  crovvnscnt: { paddingTop: height * 0.1, paddingBottom: 110, padding: 16 },
  crovvnTitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 40,
  },
  crovvncnt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
});

export default InnerCrovvnMain;
