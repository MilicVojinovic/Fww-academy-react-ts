import React from 'react';

interface propTypes {
	type?: string, validate?: boolean, placeholder?: string, disabled?: boolean, classNameProp?:string
}

function Input({ type, validate, placeholder, disabled, classNameProp } : propTypes ) {
	const borderClass = validate ? 'border border-red-500' : '';
	return (
			<input type={type} className={"w-9/12 h-8 pl-2 rounded-md pera text-black borderClass " + borderClass +  " " + classNameProp}  
			placeholder={placeholder} disabled={disabled}/>
	)
}

export default Input
