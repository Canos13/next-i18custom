"use client";
import { useTranslation } from '@/i18n'
import React, { FC } from 'react'

const Text: FC = () => {
    const t = useTranslation("Login")

    const texts = ["title","description","main.message.message2"]

    return (
        <div>
            {
                texts.map( text => 
                    <p key={text} >{ t(text) }</p>
                )
            }
        </div>
    )
}

export default Text