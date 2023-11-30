import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
function App() {
	const [num, setNum] = useState<number>(100);
	window.setNum = setNum;
	return <div>{num}</div>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
