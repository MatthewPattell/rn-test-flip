/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
	SafeAreaView,
	StatusBar,
	Button,
	View,
	Text,
	PanResponder,
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

const getInterpolationPoint = (screenRange, animatedRange, screenPoint) => {
	const [x1, x2] = screenRange
	const [y1, y2] = animatedRange

	return y2 + ((y1 - y2) / (x1 - x2)) * (screenPoint - x2)
}

const App: () => React$Node = () => {
	const ref = useRef();

	let pagesWidth = {}

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: evt => {
				const commonWidth = ref.current.card.getPagesWidth()
				const currPos = Number(evt.nativeEvent.pageX)

				// Правая граница страницы 30%
				const rightBorder = commonWidth - (commonWidth * 0.3);
				// Левая граница страницы 30%
				const leftBorder = commonWidth * 0.3;

				// Нужно прочекать gestureState.moveX, палец находится у кромки страницы (левой или правой) иначе false
				const leftDirection = (currPos >= 0 && currPos <= leftBorder)
				const rightDirection = (currPos >= rightBorder && currPos <= commonWidth)

				if (!leftDirection && !rightDirection) {
					return false;
				}

				const leftTo = commonWidth / 2;
				pagesWidth = {
					left: {
						from: 0,
						to: leftTo
					},
					right: {
						from: leftTo,
						to: commonWidth
					},
					width: Number(commonWidth),
					direction: leftDirection ? 'left' : 'right'
				}

				// Подготавливаем предыдущий или след. слайд в зависимости от того, с какой кромки начали тянуть
				ref.current.setNextSlide(<SecondSlide />);
				return true;
			},
			onPanResponderMove: (evt, gestureState) => {
				const currPoint = Number(gestureState.moveX)
				const angleFront = getInterpolationPoint([0, pagesWidth.width], [0, -180], currPoint);
				const angleBack = getInterpolationPoint([0, pagesWidth.width], [180, 0], currPoint);

				ref.current.card.animateTick(angleFront, angleBack, 1)
				console.log('MOVE', gestureState.moveX, angleFront, angleBack)
			},
			onPanResponderRelease: (evt, gestureState) => {
				// Нужно прочекать, каков статус поворота страниц, например если rotateFront (была -180) а сейчас
				// это -50 то доигрываем анимацию переворачивания вперед если -150 то назад

				// Если Пройденная пальцем дистанция мала (<10%), ничего не делаем (в процентном соотношщении от ширины)
				// if (Math.abs(gestureState.dx) <= (pagesWidth.width * 0.1)) {
				// 	return
				// }
				// Пока что просто так
				if (Math.abs(gestureState.dx) === 0) {
					return
				}

				const check = pagesWidth.direction === 'right'
							  ? (-180 / 2) - 30
							  : (-180 / 2) + 30

				if (ref.current.card.rotateFront._value > check) {
					// Страница перевернута больше чем на половину + коэфф. 30 , доигрываем анимацию до конца
					ref.current.card.animateTick()
				} else {
					// Страница перевернута меньше чем на половину, возвращаем все назад (если такое поведение нужно)
					ref.current.card.animateTick(-180, 0)
				}
			}
		})
	).current;

	const onPress = () => {
		ref.current.setNextSlide(<SecondSlide />);
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<Timer3 ref={ref} initSlide={<FirstSlide />} panHandlers={panResponder.panHandlers} />

				<Button title='Rotate!' onPress={onPress} />
			</SafeAreaView>
		</>
	);
};

export default App;
