/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
	SafeAreaView,
	StatusBar,
	Button,
	View,
	Text
} from 'react-native';

import { Timer } from './src/components';
import { Timer as Timer2 } from './src/components2';
import { Timer as Timer3 } from './src/components3';

const FirstSlide = () => {
	return (
		// !!! FIX SIZE HERE !!!
		<View style={{width: 80,backgroundColor: 'gray', paddingTop: 40}}>
				<Text>tqwertyuio</Text>
		</View>
	)
}

const SecondSlide = () => {
	return (
		// !!! FIX SIZE HERE !!!
		<View style={{width: 80, backgroundColor: 'gray', paddingTop: 50}}>
				<Text>12345rt6y7890</Text>
		</View>
	)
}

const App: () => React$Node = () => {
	const ref = useRef();

	const onPress = () => {
		ref.current.setNextSlide(<SecondSlide />);
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<Timer time={500} play={true} />
				<Timer2 time={500} play={true} />
				<Timer3 ref={ref} initSlide={<FirstSlide />} />

				<Button title='Rotate!' onPress={onPress} />
			</SafeAreaView>
		</>
	);
};

export default App;
