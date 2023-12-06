import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
function App() {
	const [num, setNum] = useState<number>(100);
	window.setNum = setNum;
	return num === 3 ? <Child /> : <div>{num}</div>;
}
function Child() {
	return <div>child</div>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
