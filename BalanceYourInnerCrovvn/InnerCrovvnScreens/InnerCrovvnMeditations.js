import { Dimensions, StyleSheet, View } from 'react-native';
import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { innerCrovvnMeditations } from '../InnerCrovvnData/innerCrovvnMeditations';
import InnerCrovvnListCard from '../InnerCrovvnComponents/InnerCrovvnListCard';

const { height } = Dimensions.get('window');

const InnerCrovvnMeditations = () => {
  return (
    <ImmerCrovvnBackground>
      <View style={styles.crovvnscnt}>
        {innerCrovvnMeditations.map((article, index) => (
          <InnerCrovvnListCard key={index} article={article} meditations />
        ))}
      </View>
    </ImmerCrovvnBackground>
  );
};

const styles = StyleSheet.create({
  crovvnbackground: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  crovvnscnt: {
    paddingTop: height * 0.08,
    padding: 16,
    paddingBottom: 110,
  },
});

export default InnerCrovvnMeditations;
