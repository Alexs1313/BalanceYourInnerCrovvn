import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const InnerCrovvnListCard = ({ article, meditations }) => {
  const navigation = useNavigation();

  return (
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
        <Image
          source={article.crovvnimage}
          style={{ width: 97, height: 97, borderRadius: 12 }}
        />
        <View style={{ alignItems: 'center', width: '60%' }}>
          <Text style={styles.crovvntitle}>{article.crovvntitle}</Text>
          {meditations && (
            <Text style={styles.crovvnduration}>
              Duration: {article.crovvnduration}
            </Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (meditations) {
              navigation.navigate('InnerCrovvnMeditationsDetails', article);
            } else {
              navigation.navigate('InnerCrovvnArticleDetails', article);
            }
          }}
        >
          <Image source={require('../../assets/images/crovvnopen.png')} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  crovvncnt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    paddingRight: 14,
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
});

export default InnerCrovvnListCard;
