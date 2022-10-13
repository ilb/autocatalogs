import React from 'react';

import 'semantic-ui-offline/semantic.min.css';

import { Segment } from 'semantic-ui-react';

import CatalogComponent from '../components/CatalogComponent';

export default function App() {
	return (
		<div className="ui container">
			<h1>Hello World!</h1>
			<CatalogComponent />
		</div>
	);
}
