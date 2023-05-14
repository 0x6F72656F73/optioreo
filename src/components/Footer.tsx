import { Box } from "@chakra-ui/react"

export default function Footer() {
    return ( 
        <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
            © 2023 OptiOreo, Inc. All rights reserved.
        </Box>
    )
}