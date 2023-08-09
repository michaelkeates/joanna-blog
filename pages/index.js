import { useState } from "react";
import {
  SimpleGrid,
  Heading,
  Box,
  useColorModeValue,
  chakra,
  Container,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import Image from "next/image";
import Bubble from "../components/bubble";
import Message from "../components/message";
import { GET_ALL_POSTS } from "../lib/queries";
import { getApolloClient } from "../lib/wordpress";
import { GridItem } from "../components/grid-item";
import NextLink from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import WavingEmoji from "../components/wavingemoji";

const ProfileImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

function dayMonth(data) {
  const monthNames = [
    //why do i have to include null?
    "null",
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //split up the string to get the day and month
  var month = parseInt(data.slice(5, 7));
  var day = data.slice(8, 10);
  var year = data.slice(0, 4);

  //remove 0 from 02, 03 etc ... until 10
  if (day[0] == "0") {
    day = day.slice(1, 2);
  }

  //concatenate the two together again and return
  var formatted = monthNames[month] + " " + day + ", " + year;

  return formatted;
}

export default function Home({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToDisplay = posts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const isBeginning = currentPage === 1;
  const isEnd = currentPage === totalPages;
  return (
    <Section delay={0.2}>
      <Flex direction="column" align="center" mt={10} width="100%" mx="auto">
        <Box
          mb={6}
          p={3}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
          css={{ backdropFilter: "blur(10px)" }}
          padding="50px"
          boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05)"
          width="100%"
        >
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            mr={{ md: 6 }}
            textAlign="center"
          >
            <Box
              boxShadow="0px 0px 2px 2px rgba(0,0,0,0.1)"
              w="150px"
              h="150px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/kitty.jpg"
                alt="Profile image"
                borderRadius="full"
                width="150"
                height="150"
              />
            </Box>
          </Box>
          <Box flexGrow={1}>
            <Heading
              as="h2"
              variant="page-title"
              fontFamily="Roboto"
              fontWeight=""
              fontSize={{ base: "2.5rem", sm: "4rem", md: "3rem" }}
            >
              Joanna's Blog
            </Heading>
            <Flex
              direction="row"
              alignItems="center" // Center horizontally
              justifyContent="center" // Center vertically
            >
              <Message>Hello!</Message>
              <WavingEmoji />
            </Flex>
          </Box>
        </Box>
        <Section delay={0.2}>
          <SimpleGrid columns={[2, 2, 2]} gap={4}>
            {postsToDisplay.map((post) => (
              <Section delay={0.1} key={post.slug}>
                <Box
                  textAlign="center"
                  bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
                  css={{ backdropFilter: "blur(10px)" }}
                  boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
                  padding="5px"
                >
                  <GridItem
                    thumbnail={post.featuredImage.node.sourceUrl}
                    title={post.title}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                    />
                    <Badge
                      bg={useColorModeValue("whiteAlpha.100", "whiteAlpha.000")}
                      color=""
                      whiteSpace="normal"
                      marginTop="10px"
                      marginBottom="10px"
                    >
                      🗓️ {dayMonth(post.date)}
                    </Badge>
                  </GridItem>
                  <NextLink href={post.path} passHref scroll={false}>
                    <Button
                      alignItems="center"
                      rightIcon={<ChevronRightIcon />}
                      bg={useColorModeValue("whiteAlpha.500", "#3b1676")}
                      _hover={{
                        bg: useColorModeValue("#ffffff", "#6023c0"),
                      }}
                      boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
                      marginTop="10px"
                      marginBottom="10px"
                    >
                      Read More
                    </Button>
                  </NextLink>
                </Box>
              </Section>
            ))}
            {!postsToDisplay ||
              (postsToDisplay.length === 0 && <li>Oops, no posts found!</li>)}
          </SimpleGrid>
        </Section>
        <SimpleGrid columns={[2, 2, 2]} gap={4}>
          <Button
            onClick={goToPreviousPage}
            disabled={isBeginning}
            opacity={isBeginning ? 0.5 : 1}
            style={{ pointerEvents: isBeginning ? "none" : "auto" }}
            leftIcon={<ChevronLeftIcon />}
            bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
            _hover={{
              bg: useColorModeValue("#ffffff", "#828282"),
            }}
            boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
          >
            Previous
          </Button>
          <Button
            onClick={goToNextPage}
            disabled={isEnd}
            opacity={isEnd ? 0.5 : 1}
            style={{ pointerEvents: isEnd ? "none" : "auto" }}
            rightIcon={<ChevronRightIcon />}
            bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
            _hover={{
              bg: useColorModeValue("#ffffff", "#828282"),
            }}
            boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
          >
            Next
          </Button>
        </SimpleGrid>
      </Flex>
    </Section>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const postData = await apolloClient.query({
    query: GET_ALL_POSTS,
  });

  const posts = postData?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      };
    });

  return {
    props: {
      posts,
    },
  };
}
