const suooortSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE =
	(suooortSymbol && Symbol.for('react.element')) || 0xeac7;
