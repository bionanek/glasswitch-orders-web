import React from 'react'
import logo from '../../logo.svg'

const RouteError = () => {
	return (
		<div>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					<strong>Error: Path does not exist</strong>
				</p>
			</header>
		</div>
	)
}

export default RouteError
