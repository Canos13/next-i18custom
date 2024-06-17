
'use client'

import { ChakraProvider } from '@chakra-ui/react'

export const ChakraUI = ({children}: ReactChildren) => (
    <ChakraProvider>{children}</ChakraProvider>
)
