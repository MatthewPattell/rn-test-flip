import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';

import NumberCard from './flip-number/number-card';

import style from './style';

class Timer extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			firstSlide: props.initSlide,
			secondSlide: <Text>Demo Slide</Text>,
		}
	}

	setNextSlide(component) {
		const { firstSlide } = this.state

		this.setState({
			firstSlide: component,
			secondSlide: firstSlide,
		})
	}

	render() {
		const { wrapperStyle } = this.props;
		const { firstSlide, secondSlide } = this.state;

		return (
			<View style={[style.wrapper, wrapperStyle]}>
				<NumberCard
					ref={r => this.card = r}
					number={firstSlide}
					previousNumber={secondSlide}
				/>
			</View>
		);
	}
}

Timer.defaultProps = {
};

Timer.propTypes = {

};

export default Timer;
