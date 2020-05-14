import React from 'react';
import { View } from 'react-native';

import style from '../style';

function Card({
				  type, size, number, cardStyle, numberStyle,
			  }) {
	return (
		<View style={[style.card, cardStyle]}>
			<View style={[style.number, {
				transform: [type === 'upper' ? { translateX: size * 0.3 } : { translateX: -size * 0.3 }],
			}, numberStyle]}
			>
				{number}
			</View>
		</View>
	);
}

Card.defaultProps = {
	cardStyle:   {},
	numberStyle: {},
};

Card.propTypes = {
	// type:        PropTypes.string.isRequired,
	// size:        PropTypes.number.isRequired,
	// number:      PropTypes.oneOfType([
	// 	PropTypes.string,
	// 	PropTypes.number,
	// ]).isRequired,
	// cardStyle:   PropTypes.object,
	// numberStyle: PropTypes.object,
};

export default Card;
