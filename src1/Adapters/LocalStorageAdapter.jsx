// storage.js
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { config } from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';



async function saveUserData(userData) {
  try {
    // //console.log("saveLocal "user);
    let { user, userToken } = userData
    await setItemAsync(config.USER_KEY, JSON.stringify(user));
    if (userToken) {
      await setItemAsync(config.USER_TOKEN_KEY, userToken);
    }
  } catch (error) {
    console.error('Error al guardar los datos del usuario de manera local:', error);
  }
};

const loadUserData = async () => {
  try {
    const userData = await getItemAsync(config.USER_KEY);
    const UserTokenKey = await getItemAsync(config.USER_TOKEN_KEY);

    if (userData && UserTokenKey) {
      return { user: JSON.parse(userData), userToken: UserTokenKey };
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario desde AsyncStorage:', error);
  }
  return null;
};

const clearUserData = async () => {
  try {
    await deleteItemAsync(config.USER_KEY);
    await deleteItemAsync(config.USER_TOKEN_KEY);
  } catch (error) {
    console.error('Error al borrar los datos del usuario en AsyncStorage:', error);
  }
};


const onboarding = async (navigation) => {
  try {
    const iniciarOnboarding = await AsyncStorage.getItem('@onboarding');
    if (iniciarOnboarding) {
      return;
    } else {
      await AsyncStorage.setItem('@onboarding', 'true');
      navigation.navigate('Onboarding');
    }
  } catch (error) {
    console.error('Error al guardar', error);
  }
}

const saveUserCustomerData = async (customer) => {
  try {
    // //console.log("saveLocal "user);

    await setItemAsync(config.CUSTOMER, JSON.stringify(customer));

  } catch (error) {
    console.error('Error al guardar los datos del cliente manera local:', error);
  }
}

const loadUserCustomerData = async () => {
  try {
    const userCustomer = await getItemAsync(config.CUSTOMER);


    if (userCustomer) {
      return { customer: JSON.parse(userCustomer) };
    }
  } catch (error) {
    console.error('Error al cargar los datos del cliente desde AsyncStorage:', error);
  }
  return null;
};

const clearUseCustomerData = async () => {
  try {
    await deleteItemAsync(config.CUSTOMER);

  } catch (error) {
    console.error('Error al borrar los datos del cliente en AsyncStorage:', error);
  }
};


const saveUserCityData = async (city) => {
  try {
    // //console.log("saveLocal "user);

    await setItemAsync(config.USER_CITY, JSON.stringify(city));

  } catch (error) {
    console.error('Error al guardar los datos del usuario de manera local:', error);
  }
}

const loadUserCityData = async () => {
  try {
    const userCity = await getItemAsync(config.USER_CITY);


    if (userCity) {
      return { userCity: JSON.parse(userCity) };
    }
  } catch (error) {
    console.error('Error al cargar los datos del usuario desde AsyncStorage:', error);
  }
  return null;
};

const clearUseCityData = async () => {
  try {
    await deleteItemAsync(config.USER_CITY);

  } catch (error) {
    console.error('Error al borrar los datos del usuario en AsyncStorage:', error);
  }
};

export const localStorage = {
  saveUserData,
  loadUserData,
  clearUserData,
  saveUserCustomerData,
  loadUserCustomerData,
  clearUseCustomerData,
  saveUserCityData,
  loadUserCityData,
  clearUseCityData,
  onboarding
}
