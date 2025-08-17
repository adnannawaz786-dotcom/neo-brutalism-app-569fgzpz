// Neo-brutalism theme constants
export const COLORS = {
  primary: {
    yellow: '#FFFF00',
    pink: '#FF00FF',
    cyan: '#00FFFF',
    lime: '#00FF00',
    orange: '#FF6600'
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    }
  },
  accent: {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    purple: '#8000FF'
  }
}

export const SHADOWS = {
  brutal: {
    small: '2px 2px 0px #000000',
    medium: '4px 4px 0px #000000',
    large: '6px 6px 0px #000000',
    xl: '8px 8px 0px #000000',
    '2xl': '12px 12px 0px #000000'
  },
  colored: {
    yellow: '4px 4px 0px #FFFF00',
    pink: '4px 4px 0px #FF00FF',
    cyan: '4px 4px 0px #00FFFF',
    red: '4px 4px 0px #FF0000',
    blue: '4px 4px 0px #0000FF'
  }
}

export const BORDERS = {
  width: {
    thin: '2px',
    medium: '3px',
    thick: '4px',
    xl: '6px'
  },
  style: 'solid',
  color: '#000000'
}

export const TYPOGRAPHY = {
  fonts: {
    heading: ['Inter', 'Arial', 'sans-serif'],
    body: ['Inter', 'Arial', 'sans-serif'],
    mono: ['JetBrains Mono', 'Courier New', 'monospace']
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900'
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  }
}

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem'
}

export const ANIMATIONS = {
  hover: {
    lift: 'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]',
    press: 'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000]',
    scale: 'hover:scale-105',
    rotate: 'hover:rotate-1'
  },
  transition: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300'
  }
}

export const PRIORITY_COLORS = {
  low: {
    bg: COLORS.primary.lime,
    border: COLORS.neutral.black,
    text: COLORS.neutral.black,
    shadow: SHADOWS.brutal.medium
  },
  medium: {
    bg: COLORS.primary.yellow,
    border: COLORS.neutral.black,
    text: COLORS.neutral.black,
    shadow: SHADOWS.brutal.medium
  },
  high: {
    bg: COLORS.primary.orange,
    border: COLORS.neutral.black,
    text: COLORS.neutral.black,
    shadow: SHADOWS.brutal.medium
  },
  urgent: {
    bg: COLORS.accent.red,
    border: COLORS.neutral.black,
    text: COLORS.neutral.white,
    shadow: SHADOWS.brutal.medium
  }
}

export const CATEGORY_COLORS = {
  personal: {
    bg: COLORS.primary.pink,
    border: COLORS.neutral.black,
    shadow: SHADOWS.colored.pink
  },
  work: {
    bg: COLORS.primary.cyan,
    border: COLORS.neutral.black,
    shadow: SHADOWS.colored.cyan
  },
  shopping: {
    bg: COLORS.primary.yellow,
    border: COLORS.neutral.black,
    shadow: SHADOWS.colored.yellow
  },
  health: {
    bg: COLORS.accent.green,
    border: COLORS.neutral.black,
    shadow: SHADOWS.brutal.medium
  },
  education: {
    bg: COLORS.accent.purple,
    border: COLORS.neutral.black,
    text: COLORS.neutral.white,
    shadow: SHADOWS.brutal.medium
  }
}

export const COMPONENT_STYLES = {
  button: {
    base: `${BORDERS.width.medium} ${BORDERS.style} ${BORDERS.color} font-bold uppercase tracking-wide ${ANIMATIONS.transition.fast} ${ANIMATIONS.hover.lift} ${ANIMATIONS.hover.press}`,
    primary: `bg-yellow-400 text-black ${SHADOWS.brutal.medium}`,
    secondary: `bg-pink-400 text-black ${SHADOWS.brutal.medium}`,
    danger: `bg-red-500 text-white ${SHADOWS.brutal.medium}`,
    success: `bg-green-400 text-black ${SHADOWS.brutal.medium}`
  },
  card: {
    base: `${BORDERS.width.medium} ${BORDERS.style} ${BORDERS.color} ${SHADOWS.brutal.medium} ${ANIMATIONS.transition.normal}`,
    hover: ANIMATIONS.hover.lift
  },
  input: {
    base: `${BORDERS.width.medium} ${BORDERS.style} ${BORDERS.color} bg-white text-black font-medium focus:outline-none focus:ring-0`,
    focus: `focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[3px_3px_0px_#000000]`
  },
  container: {
    base: 'max-w-4xl mx-auto p-4',
    section: 'mb-8'
  }
}

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

export default {
  COLORS,
  SHADOWS,
  BORDERS,
  TYPOGRAPHY,
  SPACING,
  ANIMATIONS,
  PRIORITY_COLORS,
  CATEGORY_COLORS,
  COMPONENT_STYLES,
  BREAKPOINTS
}