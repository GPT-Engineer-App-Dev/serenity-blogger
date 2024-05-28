import { Container, Text, VStack, Heading, Box, Image, Link, Button, useColorModeValue, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg={bg} color={color}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to My Personal Blog</Heading>
        <Text fontSize="lg">Sharing my thoughts and experiences with the world.</Text>
        <Box boxSize="sm">
          <Image src="/images/blog-image.jpg" alt="Blog Image" borderRadius="md" />
        </Box>
        <Text fontSize="md">Stay tuned for more updates!</Text>
        <Link href="/about" color="teal.500" fontSize="lg">Learn more about me</Link>
        <Button colorScheme="teal" as={Link} href="/add-post">Add New Post</Button>
        <VStack spacing={4} mt={8} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" width="100%" bg={bg} color={color} position="relative">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.content}</Text>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                position="absolute"
                top="1rem"
                right="1rem"
                onClick={() => handleDelete(index)}
              />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;