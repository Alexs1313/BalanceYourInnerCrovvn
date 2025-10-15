import { createStackNavigator } from '@react-navigation/stack';
import InnerCrovvnTabs from './InnerCrovvnTabs';
import InnerCrovvnEntry from '../InnerCrovvnScreens/InnerCrovvnEntry';
import InnerCrovvnArticleDetails from '../InnerCrovvnScreens/InnerCrovvnArticleDetails';
import InnerCrovvnMeditationsDetails from '../InnerCrovvnScreens/InnerCrovvnMeditationsDetails';

const Stack = createStackNavigator();

const InnerCrovvnStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="InnerCrovvnEntry" component={InnerCrovvnEntry} /> */}
      <Stack.Screen name="InnerCrovvnTabs" component={InnerCrovvnTabs} />
      <Stack.Screen
        name="InnerCrovvnArticleDetails"
        component={InnerCrovvnArticleDetails}
      />
      <Stack.Screen
        name="InnerCrovvnMeditationsDetails"
        component={InnerCrovvnMeditationsDetails}
      />
    </Stack.Navigator>
  );
};

export default InnerCrovvnStack;
