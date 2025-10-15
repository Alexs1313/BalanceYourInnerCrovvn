import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import {
  Alert,
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../InnerCrovvnStore/innerCrovvnContext';

const { height } = Dimensions.get('window');

const InnerCrovvnMeditationsDetails = ({ route }) => {
  const article = route.params;
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const { isOnMeditationsMusic } = useStore();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const s = new Sound(article.crovvnsound, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('e', error);
        return;
      }
      s.setNumberOfLoops(-1);
      setSound(s);
    });

    return () => {
      if (s) {
        s.stop(() => s.release());
      }
    };
  }, [article]);

  const toggleSound = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play(success => {
        if (!success) console.log('e');
      });
      setIsPlaying(true);
    }
  };

  const shareCrovvnArticle = async () => {
    try {
      await Share.share({
        message: `${article.crovvntitle}\n\n${article.crovvndescr} \n\nDuration: ${article.crovvnduration}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ImmerCrovvnBackground>
      <View style={styles.crovvnscnt}>
        <LinearGradient
          colors={[
            '#EA8115',
            '#ED2405',
            '#E2230D',
            '#941C45',
            '#1E2E78',
            '#1F2F79',
          ]}
          start={{ x: 0.9, y: 0 }}
          end={{ x: 0.34, y: 0.32 }}
          style={styles.crovvngradientcnt}
        >
          <View style={styles.crovvncnt}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.crovvntitle}>{article.crovvntitle}</Text>
              <Text style={styles.crovvnduration}>
                Duration: {article.crovvnduration}
              </Text>

              <Video
                source={article.crovvnvideo}
                style={{
                  alignItems: 'center',
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginTop: 10,
                  width: 242,
                  height: 242,
                }}
                autoplay
                muted
                paused={false}
                resizeMode="cover"
                repeat
                ref={videoRef}
              />

              <Text style={styles.crovvndescr}>{article.crovvndescr}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../../assets/images/crovvnback.png')} />
              </TouchableOpacity>

              {isOnMeditationsMusic && (
                <TouchableOpacity activeOpacity={0.7} onPress={toggleSound}>
                  <Image
                    source={
                      isPlaying
                        ? require('../../assets/images/crovvnpause.png')
                        : require('../../assets/images/crovvnopen.png')
                    }
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={shareCrovvnArticle}
              >
                <Image source={require('../../assets/images/crovvnshr.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ImmerCrovvnBackground>
  );
};

const styles = StyleSheet.create({
  crovvnscnt: {
    paddingTop: height * 0.08,
    padding: 16,
    paddingBottom: 110,
  },
  crovvncnt: {
    padding: 26,
  },
  crovvntitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    width: '60%',
    marginBottom: 18,
  },
  crovvndescr: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'italic',
    marginTop: 24,
    marginBottom: 37,
    lineHeight: 18,
    width: '70%',
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
    marginBottom: 18,
  },
});

export default InnerCrovvnMeditationsDetails;
