import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      position: 'relative',
      bg: mode(
        `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/blue-pink.svg') center/cover`,
        `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url('/blue-pink.svg') center/cover`
      )(props),
      backDropFilter: 'blur(10px)',
      transitionProperty: 'all',
      transitionDuration: 'normal',
      zIndex: 0,
      backgroundSize: 'cover',
    },
  }),
};


const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 1,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#3d7aed')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Roboto'"
}

const colors = {
  black: {
    500: '#000',
  },
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  disableTransitionOnChange: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme