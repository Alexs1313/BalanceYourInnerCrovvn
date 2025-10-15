import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import InnerCrovvnMain from '../InnerCrovvnScreens/InnerCrovvnMain';
import InnerCrovvnMeditations from '../InnerCrovvnScreens/InnerCrovvnMeditations';
import InnerCrovvnArticles from '../InnerCrovvnScreens/InnerCrovvnArticles';
import InnerCrovvnGallery from '../InnerCrovvnScreens/InnerCrovvnGallery';
import InnerCrovvnSettings from '../InnerCrovvnScreens/InnerCrovvnSettings';

const Tab = createBottomTabNavigator();

const InnerCrovvnTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.crovvntabbar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="InnerCrovvnMain"
        component={InnerCrovvnMain}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.crovvnicon,
                focused && { backgroundColor: '#4A4695' },
              ]}
            >
              <Image
                source={require('../../assets/images/crovvnmain.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InnerCrovvnMeditations"
        component={InnerCrovvnMeditations}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.crovvnicon,
                focused && { backgroundColor: '#4A4695' },
              ]}
            >
              <Image
                source={require('../../assets/images/crovvnmedit.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InnerCrovvnArticles"
        component={InnerCrovvnArticles}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.crovvnicon,
                focused && { backgroundColor: '#4A4695' },
              ]}
            >
              <Image
                source={require('../../assets/images/crovvnart.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InnerCrovvnGallery"
        component={InnerCrovvnGallery}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.crovvnicon,
                focused && { backgroundColor: '#4A4695' },
              ]}
            >
              <Image
                source={require('../../assets/images/crovvngall.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="InnerCrovvnSettings"
        component={InnerCrovvnSettings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.crovvnicon,
                focused && { backgroundColor: '#4A4695' },
              ]}
            >
              <Image
                source={require('../../assets/images/crovvnsett.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  crovvntabbar: {
    backgroundColor: 'rgba(29, 46, 119, 0.8)',
    elevation: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(29, 46, 119, 0.8)',
    paddingTop: 14,
    paddingBottom: 13,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    height: 67,
    marginHorizontal: 45,
    borderRadius: 12,
  },
  crovvnicon: {
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default InnerCrovvnTabs;
