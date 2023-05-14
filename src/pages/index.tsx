import Head from 'next/head'

import {Heading, Flex} from '@chakra-ui/react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Home() {
	return (
		<>
			<Head>
				<title>OptiOreo</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Flex direction={"column"} flex="1">
				<Header/>

				<Heading pt={"20"} fontSize={"7xl"} textAlign={"center"} >
					OptiOreo
				</Heading>

				<Footer />
			</Flex>
		</>
	)
}