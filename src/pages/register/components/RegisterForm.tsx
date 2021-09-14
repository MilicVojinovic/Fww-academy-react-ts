import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from '../../../common/components/Button'
import Input from '../../../common/components/Input'





function RegisterForm() {

	const history = useHistory();

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [activeRadioButton, setActiveRadioButton] = useState('teacher')

	let data : any = {'ime' : setName, 'prezime': setSurname, 'email': setEmail, 'password': setPassword}

	function register() {
		let payload = {
			name,
			surname,
			email,
			password,
			'role' : activeRadioButton
		}
	}

	function onChangeHandler(event: any) {
		for (const state in data) {
			if (state === event.name) {
				data[state](event.value)
			}
		}
	}

	function radioButtonHandler(event:any) {
		if (event.target.id==='teacher') {
			setActiveRadioButton('teacher')
		} else {
			setActiveRadioButton('student')
		}
				
	}

	return (
		<div className="register-form text-white bg-blue-400 flex flex-col justify-center items-center rounded-xl">
    		<Input name="ime" inputHandler={onChangeHandler}  placeholder="Ime" classNameProp="mt-8" />
    		<Input name="prezime" inputHandler={onChangeHandler} placeholder="Prezime" classNameProp="mt-8"  />
    		<Input name="email" inputHandler={onChangeHandler} placeholder="E-mail" classNameProp="mt-8"  />
    		<Input name="password" inputHandler={onChangeHandler} placeholder="Password" type="password" classNameProp="mt-8 mb-6" />
    		<div className="flex text-black mb-3">
    		    <input type="radio" id="teacher" value="teacher" checked={activeRadioButton==='teacher'} onChange={radioButtonHandler} className="mr-2 cursor-pointer" ></input>
    		    <label htmlFor="one" className="mr-8">Profesor</label>
    		    <br></br>
    		    <input type="radio" id="student" value="student" checked={activeRadioButton==='student'} onChange={radioButtonHandler} className="mr-2 cursor-pointer" ></input>
    		    <label htmlFor="two" className="">Student</label>
    		</div>
    		<div className="w-full flex flex-col items-center">
    		    <Button text="Registruj se" click={ () => { register() }  }   classNameProp="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5" />
    		    <Button text="Prijavi se"  click={ () => { return history.push("/")} } classNameProp="bg-indigo-900 w-4/12 text-sm  h-6 p-1 mb-3" />
    		</div>
		</div>
	)
}

export default RegisterForm

