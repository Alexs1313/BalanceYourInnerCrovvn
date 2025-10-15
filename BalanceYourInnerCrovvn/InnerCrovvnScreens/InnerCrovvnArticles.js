import { Dimensions, StyleSheet, View } from 'react-native';
import ImmerCrovvnBackground from '../InnerCrovvnComponents/ImmerCrovvnBackground';
import { innerCrovvnArticles } from '../InnerCrovvnData/innerCrovvnArticles';
import InnerCrovvnListCard from '../InnerCrovvnComponents/InnerCrovvnListCard';

const { height } = Dimensions.get('window');

const InnerCrovvnArticles = () => {
  return (
    <ImmerCrovvnBackground>
      <View style={styles.crovvnscnt}>
        {innerCrovvnArticles.map((article, index) => (
          <InnerCrovvnListCard key={index} article={article} />
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

export default InnerCrovvnArticles;
