import { useState, useEffect} from 'react';

import useSWR, { mutate } from 'swr';

import {Card, CardHeader, CardBody, CardFooter, Flex, Box } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type EntryType = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    marked: string;
}

function Entry(props: EntryType) {

    const [isMarked, setIsMarked] = useState(Boolean(props.marked));
    const [color, setColor] = useState("gray.300");


    useEffect(() => {
        const todayString = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        });
        const isTodayValue =
        new Date(props.updatedAt).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        }) === todayString;

        const colorValue = isMarked ? "green.300" : isTodayValue ? "blue.300" : "gray.300";
        setColor(colorValue);
    }, [props.updatedAt, isMarked]);


    const handleClick = async () => {

        const updatedProps = { ...props, marked: !isMarked }

        try {
            const res = await fetch(`/api/entry/${props.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProps),
                });
          if (res.ok) {
            // Update the local data
            setIsMarked(!isMarked)
            mutate("/api/entries")
          }
        } catch (error) {
          console.error(error)
        }
      }

      const handleDelete = async () => {
        try {
          const res = await fetch(`/api/entry/${props.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
          if (res.ok) {
            // Update the local data
            mutate(
              "/api/readEntries",
              (currentData?: EntryType[]) =>
                currentData?.filter((entry) => entry.id !== props.id) || [],
              false
            );
          }
        } catch (error) {
          console.error(error)
        }
      }


    
  return (
    <Card bg={color} textAlign={"center"} _hover={{ bg: "gray.200", cursor: "pointer" }} onClick={handleClick}>
      <CardHeader fontSize={"3xl"} fontWeight={"medium"}>
        {props.title}
        </CardHeader>
      <CardBody fontWeight={"bold"}>
        {props.content}
        </CardBody>
      <CardFooter justify='space-between' flexWrap='wrap'>
          <Box fontSize={"4xl"} fontWeight={"semibold"} p='4'>
            {new Date(props.updatedAt).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})}
          </Box>
          <Box p='4'>
            <FaTrash onClick={handleDelete} size={48} />
          </Box>
      </CardFooter>
    </Card>
  )
}

export default function ListEntries() {
    const { data, error, isLoading } = useSWR('/api/readEntries', fetcher);

    if (error) {
        return <div>Error loading data</div>;
      }
    
      if (isLoading) {
        return <div>Loading data...</div>;
      }
    
      return (
        <Flex direction="row" justifyContent="center" flexWrap="wrap">
          {data.map((entry: EntryType) => (
            <Box m={10} key={entry.id}>
              <Entry {...entry} />
            </Box>
          ))}
        </Flex>
      );
}