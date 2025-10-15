import { ImageBackground, ScrollView } from 'react-native';

const InnerCrovvnBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/crovvnmainbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default InnerCrovvnBackground;
