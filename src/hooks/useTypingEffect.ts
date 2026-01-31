import { useState, useEffect } from 'react'

export function useTypingEffect(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)

    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, startDelay])

  return { displayedText, isComplete }
}
