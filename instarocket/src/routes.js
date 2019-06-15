import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New,
    }, {
        defaultNavigationOptions: { // Configuração que se aplica a todas as telas
            headerTintColor: '#000',    // Muda a cor do botão voltar para preto
            headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
            headerBackTitle: null,  // Remove o texto do botão voltar
        },
        mode: 'modal'
    })
);