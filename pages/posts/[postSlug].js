import {
  Textarea,
  Flex,
  Box,
  SimpleGrid,
  Button,
  Divider,
  Input,
  useToast,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { ChevronRightIcon, CopyIcon } from "@chakra-ui/icons";
import Paragraph from "../../components/paragraph/paragraph";
import Section from "../../components/layouts/section";
import Image from "next/image";
import { getApolloClient } from "../../lib/wordpress";
import styles from "../../styles/Home.module.css";
import AuthorBio from "../../components/post/author-bio";
import LoadingLink from "../../components/navigation/loadinglink";
import {
  GET_POST_BY_SLUG,
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
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCommentValid, setIsCommentValid] = useState(true);
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
    if (!authorName || !email || !newComment) {
      //update validation status for each field
      setIsNameValid(!!authorName);
      setIsEmailValid(!!email);
      setIsCommentValid(!!newComment);

      //show error toast for fields that are not valid
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "topright",
      });
      return;
    }

    //validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setIsEmailValid(false);

      toast({
        title: "Invalid email format.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "topright",
      });
      return;
    }

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

      //show success toast notification
      toast({
        title: "Comment added!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "topright",
      });

      //reset validation status after successful submission
      setIsNameValid(true);
      setIsEmailValid(true);
      setIsCommentValid(true);
      setIsPageReloading(true);
      setTimeout(() => {
        window.location.reload();
      }, 4000); //delayed page reload
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

      } catch (error) {
        console.error("Error fetching updated post data:", error.message);
      }
    };

    window.scrollTo(0, 0);

    const fetchUpdatedPostData = () => {
      if (isCopied) {
        fetchData(); //fetch the updated post data when isCopied changes (i.e., after the user submits a comment and the page reloads)
      }
    };
    
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
              borderColor={isNameValid ? undefined : "red"}
              marginBottom="10px"
            />
            <Input
              placeholder="Enter your email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor={isEmailValid ? undefined : "red"}
              marginBottom="10px"
            />
            <Textarea
              placeholder="Enter your comment"
              size="md"
              flex="1"
              value={newComment}
              borderColor={isCommentValid ? undefined : "red"}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              colorScheme="purple"
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
