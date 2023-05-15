import { useRouter } from "next/router";
import NextLink from "next/link";

import {signIn, signOut, useSession} from "next-auth/react";

import {  Box, BoxProps, Flex, HStack, Stack, Link, useDisclosure, IconButton,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Text
    } from "@chakra-ui/react";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const NavLink = ( {link, title} ) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg:  'gray.100',
    }}
    href={link}>
    {title}
  </Link>
);

const Links = [
    {link: "/", title: "Home"},
    {link: "Morning", title: "Morning"},
    {link: "Night", title: "Night"},
]


export default function Header() {
    const router = useRouter();
    const { pathname } = router;

    const {data: session, status} = useSession();
    const loading = status === "loading";


    return (
        <Box bg={'blue.100'}>
          <Flex h={12} alignItems={'center'} justifyContent={'space-between'} fontSize="2xl" fontWeight="bold">
              <IconButton 
              size={'md'} 
              icon={<FaHamburger />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              />


          <HStack spacing={8} alignItems={'center'}>
              <Box>Logo</Box>
              <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                  <NavLink key={link.title} link={link.link || ""} title={link.title} />
              ))}
              </HStack>
          </HStack>



          <Flex alignItems={'center'}>
          {!session && (
            <Box>
              <Text>
                Not signed in <br />
              </Text>
              <Button onClick={() => signIn() }>Sign in</Button>
            </Box>
            )}
            {session?.user && (
              <Box>
                <Box as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={session.user.image ?? ""}
                />
                </Box>
                <Button onClick={() => signOut() }>Sign out</Button>
              </Box>
            )}

              
          </Flex>
        </Flex>

      </Box>
    )
}

