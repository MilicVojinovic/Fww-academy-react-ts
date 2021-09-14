import React from 'react';

interface propTypes {
	type?: string, validate?: boolean, placeholder?: string, disabled?: boolean, classNameProp?:string, inputHandler?:any, name?:string
}

function Input({ type, validate, placeholder, disabled, classNameProp, inputHandler, name } : propTypes ) {
	const borderClass = validate ? 'border border-red-500' : '';
	return (
		<input type={type} name={name} className={"w-9/12 h-8 pl-2 rounded-md text-black borderClass " + borderClass +  " " + classNameProp}  
		placeholder={placeholder} disabled={disabled} onChange={ (event: any) => {
			inputHandler(event.target);
		}}/>
	)
}

export default Input
