import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import InnerCrovvnStack from './BalanceYourInnerCrovvn/InnerCrovvnNavigation/InnerCrovvnStack';
import { ContextProvider } from './BalanceYourInnerCrovvn/InnerCrovvnStore/innerCrovvnContext';
import InnerCrovvnLoader from './BalanceYourInnerCrovvn/InnerCrovvnComponents/InnerCrovvnLoader';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isLoading ? <InnerCrovvnLoader /> : <InnerCrovvnStack />}

        <Toast position="top" topOffset={50} />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
