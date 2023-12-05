import { FC } from "react"

type TextProps = {
    tag: 'p' | 'h1' | 'h2' | 'h3' | 'span',
    children: JSX.Element | JSX.Element[]
}

const Text: FC<TextProps> = ({tag = 'p', children}) => {
  return <div>
    {children}
  </div>
}

export default Text