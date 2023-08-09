import React from 'react'

import NextLink from 'next/link'
//import Image from 'next/image'
import { gql } from '@apollo/client'

import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  Divider,
  //  List,
  //  ListItem,
  useColorModeValue,
  chakra,
  Badge,
  Flex
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../../components/paragraph'
import Section from '../../components/section'
import Image from 'next/image'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const AuthorBio = () => (
  <Section>
    <Box flexShrink={0} align="center">
      <ProfileImage
        src="/kitty.jpg"
        alt="Profile image"
        borderRadius="full"
        width="100"
        height="100"
      />
    </Box>
    <Box display={{ md: 'flex' }}>
      <Box flexGrow={1}>
        <Heading
          as="h3"
          variant="page-title"
          fontFamily="Roboto"
          fontWeight=""
          textAlign="center"
        >
          Joanna
        </Heading>
      </Box>
    </Box>

    <Section delay={0.1}>
      <Paragraph>
        Biography about yourself.
      </Paragraph>
    </Section>
  </Section>
)

export default AuthorBio