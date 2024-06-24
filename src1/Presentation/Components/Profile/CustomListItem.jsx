import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { config } from '../../../Config';
import { Image as img } from '../../Assets/Image/path';
const CustomListItem = ({ navigation }) => {
    // Datos de ejemplo para cada elemento de la lista
    const data = [
        {
            name: 'Mi Empresa',
            subtitle: 'Informacion de tu empresa',
            icono: img.iconCompany,
            routeScreen: config.routes.viewCompany
        },
        {
            name: 'Usuario',
            subtitle: 'Modificar información del usuario',
            icono: img.infoUser,
            routeScreen: config.routes.viewUser
        },
        {
            name: 'Sobre Nosotros',
            subtitle: 'WorkCorp',
            icono: img.iconWK,
            routeScreen: config.routes.viewInfoWorkCorp
        },

    ];

    return (
        <View>
            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(item.routeScreen)}
                >
                    <ListItem key={index} bottomDivider containerStyle={{ borderColor: config.COLOR_RED }}>
                        <Avatar rounded source={item.icono} size={47} />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron color={config.COLOR_RED} />
                    </ListItem>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CustomListItem;
