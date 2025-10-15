import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const InnerCrovvnMoodCard = ({
  article,
  setIsVisibleCrovvnModal,
  setCrovvnMood,
}) => {
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
        <Image source={article.crovvnimage} />
        <View style={{ alignItems: 'center', width: '60%' }}>
          <Text style={styles.crovvntitle}>{article.crovvntitle}</Text>

          <Text style={styles.crovvnduration}>{article.date}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setIsVisibleCrovvnModal(true);
            setCrovvnMood(article);
          }}
        >
          <Image source={require('../../assets/images/crovvnclr.png')} />
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
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default InnerCrovvnMoodCard;
