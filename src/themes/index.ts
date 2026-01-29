export interface Theme {
  name: string
  id: string
  colors: {
    bg: string
    bgSecondary: string
    text: string
    textDim: string
    accent: string
    border: string
  }
}

export const themes: Theme[] = [
  {
    name: 'Nord',
    id: 'nord',
    colors: {
      bg: '#2e3440',
      bgSecondary: '#3b4252',
      text: '#eceff4',
      textDim: '#8fbcbb',
      accent: '#88c0d0',
      border: '#4c566a',
    }
  },
  {
    name: 'Dracula',
    id: 'dracula',
    colors: {
      bg: '#282a36',
      bgSecondary: '#44475a',
      text: '#f8f8f2',
      textDim: '#6272a4',
      accent: '#bd93f9',
      border: '#44475a',
    }
  },
  {
    name: 'Tokyo Night',
    id: 'tokyo-night',
    colors: {
      bg: '#1a1b26',
      bgSecondary: '#24283b',
      text: '#c0caf5',
      textDim: '#565f89',
      accent: '#7aa2f7',
      border: '#414868',
    }
  },
  {
    name: 'Gruvbox',
    id: 'gruvbox',
    colors: {
      bg: '#282828',
      bgSecondary: '#3c3836',
      text: '#ebdbb2',
      textDim: '#a89984',
      accent: '#fabd2f',
      border: '#504945',
    }
  },
  {
    name: 'GitHub Dark',
    id: 'github-dark',
    colors: {
      bg: '#0d1117',
      bgSecondary: '#161b22',
      text: '#e6edf3',
      textDim: '#8b949e',
      accent: '#58a6ff',
      border: '#30363d',
    }
  },
  {
    name: 'GitHub Light',
    id: 'github-light',
    colors: {
      bg: '#ffffff',
      bgSecondary: '#f6f8fa',
      text: '#1f2328',
      textDim: '#656d76',
      accent: '#0969da',
      border: '#d0d7de',
    }
  },
  {
    name: 'Matrix',
    id: 'matrix',
    colors: {
      bg: '#0d0d0d',
      bgSecondary: '#1a1a1a',
      text: '#00ff00',
      textDim: '#00aa00',
      accent: '#00ff00',
      border: '#003300',
    }
  },
]

export const defaultTheme = 'github-dark'
