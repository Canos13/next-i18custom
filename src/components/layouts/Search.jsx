import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { Fragment } from 'react'
import ButtonIcon from './Forms/ButtonIcon'

const SearchComp = (props) => {
    const { onClick, tooltip, placeholder, setString, string } = props;

    const handleChange = (e) => setString(e.target.value)

    return (
        <Fragment>
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={string}
                    backgroundColor='#fff'
                />
                <InputRightElement width='4.5rem'>
                    <ButtonIcon
                        icon={faSearch}
                        tooltip={tooltip}
                        onClick={onClick}
                    />
                </InputRightElement>
            </InputGroup>
        </Fragment>
    )
}

export default SearchComp;