import React from 'react'
import {
  Heading,
  Box,
  chakra
} from '@chakra-ui/react'
import Paragraph from '../paragraph/paragraph'
import Section from '../layouts/section'
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