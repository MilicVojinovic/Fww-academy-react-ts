import React from 'react'

interface propTypes {
	click: any , text: string , classNameProp?:string,
} 

function Button({click, text, classNameProp} : propTypes) {
	return (
		<div className={'flex button text-white rounded-xl cursor-pointer font-bold justify-center items-center ' + classNameProp}  
			onClick={click}>
    		<span>{ text }</span>
		</div>
	)
}

export default Button
