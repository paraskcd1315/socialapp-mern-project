import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log('SUCCESS!');
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='mi mi-Contact'></i>Sign into your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='password'
						placeholder='Password'
						value={password}
						onChange={(e) => onChange(e)}
						minLength='8'
						required
					/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary' />
			</form>
			<p className='my-1'>
				Don't have an Account? <Link to='/register'>Sign up</Link>
			</p>
		</Fragment>
	);
};

export default Login;
