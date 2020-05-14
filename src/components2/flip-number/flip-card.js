import PropTypes from 'prop-types';
import React from 'react';
import {
	Animated,
	Text,
	View,
} from 'react-native';

import style from '../style';

function FlipCard({
					  setRef, type, size, number, flipCardStyle, numberStyle,
				  }) {
	const translateSize = 0.3
	return (
		<Animated.View
			ref={setRef}
			style={[
				style.flipCard,
				type === 'front'
				? {
						left: 0,
					}
				: {
						left: '50%',
					},
				flipCardStyle,
				{
					overflow: 'hidden',
				}
			]}
		>
			{/*<View style={style.overflowContainer}>*/}
				<Text style={[style.number, {
					transform:  [type === 'front' ? { translateX: size * translateSize } : { translateX: -size * translateSize }],
					fontSize:   size / 1.5,
					lineHeight: size / 1.5,
				}, numberStyle]}
				>
					{number}
				</Text>
			{/*</View>*/}
		</Animated.View>
	);
}

FlipCard.defaultProps = {
	flipCardStyle: {},
	numberStyle:   {},
};

FlipCard.propTypes = {
	setRef:        PropTypes.func.isRequired,
	type:          PropTypes.string.isRequired,
	size:          PropTypes.number.isRequired,
	number:        PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	flipCardStyle: PropTypes.object,
	numberStyle:   PropTypes.object,
};

export default FlipCard;
