import React from 'react';
import {
	Animated,
	Dimensions,
	View,
} from 'react-native';

import style from '../style';

import TransformUtil from '../utils';
import Card from './card';
import FlipCard from './flip-card';

const { width } = Dimensions.get('window');

class NumberCard extends React.Component
{
	constructor(props) {
		super(props);
		this.rotateFront = new Animated.Value(0);
		this.rotateBack  = new Animated.Value(-180);

		this.frontRef = null;
		this.backRef  = null;

		this.speed = 0;

		this.state = {
			showSlide: true,
		};
	}

	componentDidMount() {
		const { size } = this.props;
		this.animateTick();

		this.rotateFront.addListener(({ value }) => {
			this.transformRef(this.frontRef, value, size * 0.3);
		});

		this.rotateBack.addListener(({ value }) => {
			this.transformRef(this.backRef, value, -size * 0.3);
		});

		this.speed = 800;
	}

	// shouldComponentUpdate(nextProps) {
	// const { number } = this.props;
	// if (nextProps.number !== number) {
	// 	this.animateTick();
	// }
	// return true;
	// }

	setFrontRef = (ref) => {
		this.frontRef = ref;
	};

	setBackRef = (ref) => {
		this.backRef = ref;
	};

	animateTick = (frontVal = 0, backVal = 180, speed) => {
		const frontStartValue = -180;
		const frontEndValue = 0;

		const backStartValue = 0;
		const backEndValue = 180;

		if (this.state.showSlide === true) {
			this.setState({ showSlide: false });

			this.rotateFront.setValue(frontStartValue);
			this.rotateBack.setValue(backStartValue);
		}

		Animated.parallel([
			Animated.timing(this.rotateFront, {
				toValue:         frontVal,
				duration:        speed || this.speed,
				useNativeDriver: true,
			}),
			Animated.timing(this.rotateBack, {
				toValue:         backVal,
				duration:        speed || this.speed,
				useNativeDriver: true,
			}),
		]).start(({ finished }) => {
			if (finished && this.rotateBack._value === backEndValue && this.rotateFront._value === frontEndValue) {
				this.setState({ showSlide: true });
			}
		});
	};

	transformRef = (ref, deg, x) => {
		const { perspective } = this.props;
		const matrix          = TransformUtil.createIdentityMatrix();
		TransformUtil.translateMatrix(matrix, { x, y: 0, z: 0 });
		TransformUtil.perspectiveMatrix(matrix, perspective);
		TransformUtil.rotateXMatrix(matrix, deg);
		TransformUtil.untranslateMatrix(matrix, { x, y: 0, z: 0 });
		if (ref) {
			ref.setNativeProps({ style: { transform: [{ matrix }] } });
		}
	};

	renderSlide() {
		const {
				  number,
			  } = this.props;

		return (
			<View style={[style.card]}>
				{number}
			</View>
		);
	}

	renderPages() {
		const {
				  number, previousNumber, size, cardStyle, flipCardStyle, numberStyle,
			  } = this.props;

		return (
			<>
				<Card
					type="upper"
					size={size}
					number={previousNumber}
					cardStyle={cardStyle}
					numberStyle={numberStyle}
				/>
				<Card
					type="lower"
					size={size}
					number={number}
					cardStyle={cardStyle}
					numberStyle={numberStyle}
				/>
				<FlipCard
					setRef={this.setFrontRef}
					type="front"
					size={size}
					number={number}
					flipCardStyle={flipCardStyle}
					numberStyle={numberStyle}
				/>
				<FlipCard
					setRef={this.setBackRef}
					type="back"
					size={size}
					number={previousNumber}
					flipCardStyle={flipCardStyle}
					numberStyle={numberStyle}
				/>
			</>
		);
	}

	getPagesWidth()
	{
		const {
				  size,
			  }             = this.props;

		return size * 1.2
	}

	render() {
		const {
				  size, numberWrapperStyle, panHandlers,
			  }             = this.props;
		const { showSlide } = this.state;

		return (
			<View style={[style.numberWrapper,
				{ width: size * 1.2, height: size * 1.2 },
				numberWrapperStyle]}
				  {...panHandlers}
			>
				{showSlide ? this.renderSlide() : this.renderPages()}
			</View>
		);
	}
}

NumberCard.defaultProps = {
	size:        width / 6,
	perspective: 250,
};

NumberCard.propTypes = {
	// number: PropTypes.oneOfType([
	// 	PropTypes.string,
	// 	PropTypes.number,
	// ]).isRequired,
	// previousNumber: PropTypes.oneOfType([
	// 	PropTypes.string,
	// 	PropTypes.number,
	// ]),
	// perspective: PropTypes.number,
	// size: PropTypes.number,
	// numberWrapperStyle: PropTypes.object,
	// cardStyle: PropTypes.object,
	// flipCardStyle: PropTypes.object,
	// numberStyle: PropTypes.object,
};

export default NumberCard;
