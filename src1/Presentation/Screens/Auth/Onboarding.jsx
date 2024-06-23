import React, { useRef, useEffect } from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { config } from '../../../Config';

const { width, height } = Dimensions.get('screen');

/* "#B98EFF" */
/*image:"https://cdn-icons.flaticon.com/png/512/2970/premium/2970063.png?token=exp=1656363173~hmac=7b1913e4f3a7ba51153797a3dd5205a2"
 */
const bgs = ['#fe5000', '#70a1ff', '#54a0ff', config.COLOR_RED];
const DATA = [
  {
    key: '1',
    title: 'Bienvenido',
    description: 'Gestiona tus cotizaciones',
    image: require('../../../Presentation/Assets/Image/Auth/onbor1.png'),
  },

  {
    key: '2',
    title: 'Envia tu Cotización',
    description: 'Realiza el envio de tus cotizaciones por WhatsApp y Email',
    image: require('../../../Presentation/Assets/Image/Auth/onbor2.png'),
  },
  {
    key: '3',
    title: 'Administra tus Clientes',
    description:
      'Registra tus clientes potenciales',
    image: require('../../../Presentation/Assets/Image/Auth/onbor3.png'),
  },
  {
    key: '4',
    title: 'Gestiona tus Especies',
    description:
      'Registra las especies de tu barraca',
    image: require('../../../Presentation/Assets/Image/Auth/onbor4.png'),
  },
];
const Indicador = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 50, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicador-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  /* comoponente para la paginacion inferior */
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  /* componente del wave blanco en cada menu */
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default function Onboarding({ navigation }) {
/*    useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    return () => {
      navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    };
  }, []); */

  const scrollX = useRef(new Animated.Value(0)).current;
  /* const Navegacion=({navigation})=>{
    return navigation.navigate("Buscar");
} */
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{ flex: 0.3, top: 15 }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: 24,
                    marginBottom: 5,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ color: '#fff', fontWeight: '400', marginBottom: 10 }}
                >
                  {item.description}
                </Text>

                {item.key == 4 ? (
                  <View style={{ paddingHorizontal: 53, top: 15 }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(config.routes.Login)}
                      style={styles.BtnInicio}
                    >
                      <Text>Empezar</Text>
                    </TouchableOpacity>
                    {/*  <Image
                      source={imagenPath.inidicador}
                      style={styles.ImagenIndicador}
                    /> */}
                  </View>
                ) : (
                  <Text> </Text>
                )}
              </View>
            </View>
          );
        }}
      />
      <Indicador scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtnInicio: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 6.3,
  },
  ImagenIndicador: {
    width: 45,
    height: 45,
    left: 113,
    top: -37,
    borderRadius: 10,
  },
});