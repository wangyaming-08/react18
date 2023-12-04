import { ReactElementType } from 'shared/ReactTypes';
// @ts-ignore
import { createRoot } from 'react-dom';

export function renderIntoDocument(element: ReactElementType) {
	const div = document.createElement('div');
	// None of our tests actually require attaching the container to the
	// DOM, and doing so creates a mess that we rely on test isolation to
	// clean up, so we're going to stop honoring the name of this method
	// (and probably rename it eventually) if no problems arise.
	// document.documentElement.appendChild(div);
	return createRoot(div).render(element);
}
