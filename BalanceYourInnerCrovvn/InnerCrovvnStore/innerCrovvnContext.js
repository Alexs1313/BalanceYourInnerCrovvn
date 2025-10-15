import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [isOnMeditationsMusic, setIsOnMeditationsMusic] = useState(false);
  const [isOnCrovvnNotifications, setIsOnCrovvnNotifications] = useState(false);
  const [todaysMood, setTodaysMood] = useState([]);
  const [selectedCrovvnMood, setSelectedCrovvnMood] = useState(null);

  // const getFormattedDate = () => {
  //   const now = new Date();
  //   const day = String(now.getDate()).padStart(2, '0');
  //   const month = String(now.getMonth() + 1).padStart(2, '0');
  //   const year = now.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const deleteCrovvnMood = async dateToDelete => {
    try {
      const updatedMoods = todaysMood.filter(
        item => item.date !== dateToDelete,
      );

      await AsyncStorage.setItem(
        'crovvnMoodHistory',
        JSON.stringify(updatedMoods),
      );

      setTodaysMood(updatedMoods);

      // const todayDate = getFormattedDate();
      // if (dateToDelete === todayDate) setSelectedCrovvnMood(null);
    } catch (error) {
      console.error('Error deleting mood:', error);
    }
  };

  const value = {
    isOnMeditationsMusic,
    setIsOnMeditationsMusic,
    isOnCrovvnNotifications,
    setIsOnCrovvnNotifications,
    todaysMood,
    setTodaysMood,
    deleteCrovvnMood,
    selectedCrovvnMood,
    setSelectedCrovvnMood,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
