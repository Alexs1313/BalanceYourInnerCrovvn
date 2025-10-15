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
import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const InnerCrovvnArticleDetails = ({ route }) => {
  const [rating, setRating] = useState(0);
  const article = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const loadCrovvnRating = async () => {
      try {
        const key = `crovvnrating_${article.id || article.crovvntitle}`;
        const savedRating = await AsyncStorage.getItem(key);
        if (savedRating !== null) {
          setRating(Number(savedRating));
        }
      } catch (e) {
        console.log('e', e);
      }
    };
    loadCrovvnRating();
  }, [article]);

  const handleCrovvnStarPress = async star => {
    setRating(star);
    try {
      const key = `crovvnrating_${article.id || article.crovvntitle}`;
      await AsyncStorage.setItem(key, star.toString());
    } catch (e) {
      console.log('e', e);
    }
  };

  const shareCrovvnArticle = async () => {
    try {
      await Share.share({
        message: `${article.crovvntitle}\n\n${article.crovvndescr}`,
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
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text style={styles.crovvntitle}>{article.crovvntitle}</Text>
              <Image
                source={article.crovvnimage}
                style={{ width: 97, height: 97, borderRadius: 12 }}
              />
            </View>

            <Text style={styles.crovvndescr}>{article.crovvndescr}</Text>
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

              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[1, 2, 3].map(star => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleCrovvnStarPress(star)}
                  >
                    <Image
                      source={
                        star <= rating
                          ? require('../../assets/images/crovvnfilled.png')
                          : require('../../assets/images/crovvnstar.png')
                      }
                      style={styles.star}
                    />
                  </TouchableOpacity>
                ))}
              </View>

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
  },
  crovvngradientcnt: {
    borderRadius: 12,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default InnerCrovvnArticleDetails;
