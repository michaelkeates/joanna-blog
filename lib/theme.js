import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f5f5f7', '#2d1965')(props),
      transitionProperty: "all",
      transitionDuration: "normal"
    }
  })
}

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
  grassTeal: '#88ccca',
  yellowLight: '#FEFCBF',
  black: {
    500: '#000',
  },
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  disableTransitionOnChange: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme