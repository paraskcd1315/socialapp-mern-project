import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
	return (
		<div class='dash-buttons'>
			<Link to='/edit-profile' class='btn'>
				<i class='mi mi-Contact2 text-primary'></i> Edit Profile
			</Link>
			<Link to='/add-experience' class='btn'>
				<i class='mi mi-Work text-primary'></i> Add Experience
			</Link>
			<Link to='/add-education' class='btn'>
				<i class='mi mi-Education text-primary'></i> Add Education
			</Link>
		</div>
	);
};

export default DashboardActions;
