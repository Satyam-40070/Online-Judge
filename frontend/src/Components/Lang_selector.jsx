import React from 'react'
import { LANGUAGE_VER } from './Constants.js'
import {Box ,Button, Text, Menu, MenuButton,MenuList,MenuItem} from '@chakra-ui/react'

const languages = Object.entries(LANGUAGE_VER); 

const Lang_selector = ({language,onSelect}) => {
  return (
        <Box className='flex flex-wrap space-x-2'>
            <Text mb={2} fontSize='lg'>Language:</Text>
                <Menu>
                <MenuButton border={2} borderColor={'whitesmoke'} as={Button}>
                    {language}
                </MenuButton>
                <MenuList color='white' zIndex={50}>
                    {
                        languages.map(([language, version]) => (
                            <MenuItem bg={'black'} key={language}
                             onClick={() => onSelect(language)}
                            >{language} &nbsp;
                            <Text as='span' fontSize='sm;'>
                            {version};
                            </Text>                             
                             </MenuItem>
                        ))
                    }
                </MenuList>
                </Menu>
        </Box>
    
  );
};

export default Lang_selector
