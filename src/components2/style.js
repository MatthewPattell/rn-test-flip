import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
	},
	numberWrapper: {
		flexDirection: 'row',
		backgroundColor: '#333333',
		margin: 3,
		shadowColor: '#1f1f1f',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 2,
		shadowOpacity: 1,
		elevation: 5,
	},
	card: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#1f1f1f',
		overflow: 'hidden',
	},
	overflowContainer: {
		margin: 0,
		padding: 0,
		overflow: 'hidden',
	},
	number: {
		fontWeight: '700',
		color: '#cccccc',
	},
	flipCard: {
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '50%',
		backgroundColor: '#333333',
		backfaceVisibility: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	separator: {
		marginHorizontal: 5,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	circle: {
		height: 5,
		width: 5,
		borderRadius: 5,
		backgroundColor: '#333333',
	},
});
