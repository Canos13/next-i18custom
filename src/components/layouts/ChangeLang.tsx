"use client";
import { useCounterStore } from '@/context/store';
import React from 'react'

const ChangeLang = () => {

    const { changeLang } = useCounterStore();
	
	const changeLan = (e: any) => changeLang(e.target.value)

    return (
        
        <select onChange={changeLan} >
            <option value="es">Espaniol</option>
            <option value="en">Ingles</option>
        </select>
    )
}

export default ChangeLang