import {
  Textarea,
  Container,
  Flex,
  Box,
  SimpleGrid,
  Button,
  Divider,
  Input,
  useToast,
  useColorModeValue,
  chakra,
  Badge,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Head from "next/head";
import { ChevronRightIcon, CopyIcon } from "@chakra-ui/icons";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import Image from "next/image";
import Layout from "../../components/layouts/article";
import { getApolloClient } from "../../lib/wordpress";

import { Title, Portfolio, Blog, WorkImage, Meta } from "../../components/work";

import styles from "../../styles/Home.module.css";

import AuthorBio from "../../components/post/author-bio";

import LoadingLink from "../../components/loadinglink";

import {
  GET_POST_BY_SLUG,
  GET_ALL_POSTS,
  useCreateCommentMutation,
} from "../../lib/queries";

import { useEffect, useRef, useState } from "react";

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

export default function Post({ post }) {
  const toast = useToast();
  const blockquoteRefs = useRef([]);
  const isMounted = useRef(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPageReloading, setIsPageReloading] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [email, setEmail] = useState("");
  const [createCommentMutation, { loading, error, data }] =
    useCreateCommentMutation();

  const handleCommentSubmit = async () => {
    // Check if newComment and authorName have valid values
    // ...

    try {
      const { data } = await createCommentMutation({
        variables: {
          input: {
            content: newComment,
            commentOn: post.databaseId,
            author: authorName,
            authorEmail: email,
          },
        },
      });

      // Show success toast notification
      toast({
        title: "Comment added!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
        render: () => (
          <Box
            color="white"
            p={3}
            bg="green.500"
            borderRadius="md"
            boxShadow="md"
            zIndex="9999"
            // Customize the bottom spacing as needed
            css={{ marginBottom: "50px" }}
          >
            Comment added successfully!
          </Box>
        ),
      });

      //You can consider removing the page reload
       setIsPageReloading(true);
       setTimeout(() => {
         window.location.reload();
       }, 4000); // Delayed page reload
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the updated post data using the slug
        const apolloClient = getApolloClient();
        const postData = await apolloClient.query({
          query: GET_POST_BY_SLUG,
          variables: {
            slug: post.slug,
          },
        });

        const updatedPost = postData?.data?.postBy;

        // TODO: Set the updatedPost to the component state or wherever you need it
      } catch (error) {
        console.error("Error fetching updated post data:", error.message);
      }
    };

    const fetchUpdatedPostData = () => {
      if (isCopied) {
        fetchData(); // Fetch the updated post data when isCopied changes (i.e., after the user submits a comment and the page reloads)
      }
    };
    if (!isMounted.current) {
      isMounted.current = true;
      const blockquotes = Array.from(
        blockquoteRefs.current.querySelectorAll(".wp-block-code")
      );
      blockquotes.forEach((blockquote) => {
        if (!blockquote.querySelector(".copy-btn")) {
          const quoteText = blockquote.textContent;

          blockquote.addEventListener("mouseover", () => {
            // Handle mouseover logic here
          });
          blockquote.addEventListener("mouseout", () => {
            // Handle mouseout logic here
          });

          blockquote.style.position = "relative";
          blockquote.style.display = "inline-block";
          blockquote.style.paddingTop = "25px";
          // Append the copy button dynamically if needed
        }
      });
      fetchData();
    }
    fetchUpdatedPostData();
  }, [isCopied, post.slug]);

  return (
    <Section delay={0.2}>
      <Flex direction="column" align="center" mt={10} width="100%" mx="auto">
        <main className={styles.main}>
          <h1 className={styles.title}>{post.title}</h1>
          <SimpleGrid paddingTop="25px" paddingBottom="25px">
            <Divider my={1} />
            <Paragraph>
              <div className="post-content">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  ref={(el) => (blockquoteRefs.current = el)}
                />
              </div>
            </Paragraph>
          </SimpleGrid>
          <Divider my={6} />
          <div style={{ marginBottom: "-5rem" }}>
            <AuthorBio />
          </div>
        </main>
        <Divider my={6} />
        <div>
          {post.comments.nodes.map((comment) => (
            <Box
              key={comment.id}
              mb={6}
              p={3}
              alignItems="center"
              bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
              css={{ backdropFilter: "blur(10px)" }}
              padding="10px"
              boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05)"
              borderRadius="md"
            >
              <Flex alignItems="center" mb={2}>
                {comment.author.node.avatar && (
                  <div>
                    <img
                      src={comment.author.node.avatar.url}
                      alt={`Avatar of ${comment.author.node.name}`}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                )}
                <div style={{ marginLeft: "10px" }}>
                  <div>{comment.author.node.name}</div>
                  <div style={{ fontSize: "11px" }}>{comment.date}</div>
                </div>
              </Flex>
              <Divider my={1} />
              <div
                dangerouslySetInnerHTML={{ __html: comment.content }}
                style={{ fontSize: "14px", marginLeft: "10px" }}
              />
            </Box>
          ))}
          <Box
            mb={6}
            p={3}
            alignItems="center"
            bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
            css={{ backdropFilter: "blur(10px)" }}
            padding="10px"
            boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05)"
            position="relative"
            widht="100%"
            borderRadius="md"
          >
            <Input
              placeholder="Enter your name"
              size="md"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              marginBottom="10px" // Add some spacing between the input and the textarea
            />
            <Input
              placeholder="Enter your email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              marginBottom="10px" // Add some spacing between the input and the textarea
            />
            <Textarea
              placeholder="Enter your comment"
              size="md"
              flex="1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              colorScheme="purple"
              //change font color to white
              color="white"
              boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
              position="flex"
              bottom="5px"
              right="5px"
              marginTop="5px"
              ml="auto"
              mt={4}
              onClick={handleCommentSubmit}
              border="1px"
              borderColor="whiteAlpha.100"
              borderRadius="md"
            >
              Comment
            </Button>
          </Box>
        </div>
        <LoadingLink href="/" passHref scroll={false}>
          <Button
            rightIcon={<ChevronRightIcon />}
            boxShadow="0px 0px 12px 0px rgba(0,0,0,0.05);"
            border="1px"
            borderColor="whiteAlpha.100"
            borderRadius="md"
          >
            Go Back
          </Button>
        </LoadingLink>
      </Flex>
    </Section>
  );
}

// Add the getStaticProps function to fetch the specific post data
export async function getServerSideProps({ params }) {
  const apolloClient = getApolloClient();

  const postData = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: {
      slug: params.postSlug,
    },
    fetchPolicy: "network-only",
  });

  const post = postData?.data?.postBy;

  return {
    props: {
      post,
    },
  };
}
