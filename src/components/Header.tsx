import { useRouter } from "next/router";

import {  Box, BoxProps, Center, Flex, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header(props: BoxProps) {
    const router = useRouter();
    const { pathname } = router;

    return (
        <Box {...props}>
            <Flex alignItems={"center"} minWidth={"max-content"} gap="10" fontSize="2xl" fontWeight="bold">
                <Link flex='1' as={NextLink} href="Morning">
                    <Center bg={pathname === '/Morning' ? 'red.300' : 'red.100'} h='10' borderRadius='full'>
                        Morning 
                    </Center>
                </Link>

                <Link flex='1' as={NextLink} href="/">
                    <Center bg={pathname === '/' ? 'green.300' : 'green.100'}  h='10' borderRadius='full'>
                        Home
                    </Center>
                </Link>
                
                <Link flex='1' as={NextLink} href="Night">
                    <Center  bg={pathname === '/Night' ? 'blue.300' : 'blue.100'} h='10' borderRadius='full'>
                        Night 
                    </Center>
                </Link>
            </Flex>
        </Box>
    )
}