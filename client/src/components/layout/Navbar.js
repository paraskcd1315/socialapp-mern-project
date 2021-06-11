import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav
			className={
				useLocation().pathname === '/'
					? 'navbar bg-dark-with-opacity'
					: 'navbar bg-dark-with-opacity-dark'
			}>
			<h1>
				<Link to='/'>
					<i className='mi mi-Code'></i> devSocial
				</Link>
			</h1>
			<ul>
				<li>
					<Link to='/'>Developers</Link>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
