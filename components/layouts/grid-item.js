import Image from "next/image";
import { Box, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import React from "react";

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box textAlign="center">
    <LinkBox width="100%">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        //placeholder="blur"
        layout="responsive"
        height="220"
        width="0" // Set the width to 100% to fill the box
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text fontSize={18} mt={2}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={11}>{children}</Text>
    </LinkBox>
    <style>
      {`
        .grid-item-thumbnail {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          /* Add other styles as needed */
        }
      `}
    </style>
  </Box>
);
