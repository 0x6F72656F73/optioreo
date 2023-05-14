import { useState, useRef, useEffect, FormEvent } from 'react';

import { mutate } from "swr";

import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, useToast, Textarea } from "@chakra-ui/react";

interface FormData {
    title: string;
    content: string;
}

export default function EntryForm() {

    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
    });
    
    const toast = useToast();

    const titleRef = useRef<HTMLInputElement>(null);
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    
        try {
            // Submit form data to API
            const response = await fetch("/api/createEntry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });
    
            // Handle API response
            const data = await response.json();
            console.log(data);

            // Trigger a revalidation (refetch) to make sure our local data is correct
            mutate("/api/readEntries");
    
            // Show success message in toast
            toast({
            title: "Entry submitted",
            description: "Your form has been successfully submitted.",
            status: "success",
            duration: 5000,
            isClosable: true,
            variant: "solid",
            render:() => (
                <Box color="white" p={3} bg="purple.500" fontWeight={"bold"} fontSize={"2xl"} textAlign={"center"} width={"700px"} height={"40px"} rounded="md">
                    Your form has been successfully submitted.
                </Box>
            ),
            });
    
            // Reset form data
            setFormData({ title: "", content: "" });

        } catch (error) {
            console.error(error);
    
            // Show error message in toast
            toast({
            title: "Error",
            description: "There was an error submitting the form.",
            status: "error",
            duration: 5000,
            isClosable: true,
            });
        }
        };
    
    const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'n') {
            titleRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    

    return (
        <Box>
            <Heading fontSize={"6xl"} textAlign={"center"} m={"20"} >
                Create new entry for today
            </Heading>

            <Flex justifyContent="center" alignItems="center">
                <Box width={"1000px"}>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="title">
                            <Flex justifyContent="center">
                                <FormLabel textColor={"blue"} fontWeight={"600"} fontSize={"4xl"}>Title</FormLabel>
                            </Flex>
                            <Input type="text" name="title" value={formData.title} onChange={handleInputChange} ref={titleRef} size={"lg"} />
                        </FormControl>
                        

                        <FormControl id="content">
                            <Flex justifyContent="center">
                                <FormLabel textColor={"blue"} fontWeight={"600"} fontSize={"4xl"}>Content</FormLabel>
                            </Flex>
                            <Textarea name="content" value={formData.content} onChange={handleInputChange} />
                        </FormControl>

                        <br />

                        <Flex justifyContent="center">
                            <Button type="submit">Submit</Button>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}