import type { JSX } from 'react'

type LexicalNode = {
  type?: string
  tag?: string
  version?: number
  children?: LexicalNode[]
  text?: string
  format?: number
  url?: string
  fields?: Record<string, unknown>
}

function renderNode(node: LexicalNode, key: number, textColor: string): JSX.Element | null {
  if (node.type === 'text') {
    let text: JSX.Element | string = node.text || ''
    if (node.format === 1) text = <strong key={key}>{text}</strong>
    else if (node.format === 2) text = <em key={key}>{text}</em>
    else if (node.format === 8) text = <code key={key}>{text}</code>
    return <span key={key}>{text}</span>
  }

  if (node.type === 'link') {
    return (
      <a key={key} href={node.url} target="_blank" rel="noopener noreferrer" className="text-olive underline">
        {node.children?.map((child, i) => renderNode(child, i, textColor))}
      </a>
    )
  }

  const tag = (node.tag || 'p') as keyof JSX.IntrinsicElements
  const children = node.children?.map((child, i) => renderNode(child, i, textColor))

  switch (tag) {
    case 'h1':
      return <h1 key={key} className={`font-display text-3xl font-bold ${textColor}`}>{children}</h1>
    case 'h2':
      return <h2 key={key} className={`font-display text-2xl font-bold ${textColor}`}>{children}</h2>
    case 'h3':
      return <h3 key={key} className={`font-display text-xl font-semibold ${textColor}`}>{children}</h3>
    case 'ul':
      return <ul key={key} className="list-disc space-y-1 pl-5">{children}</ul>
    case 'ol':
      return <ol key={key} className="list-decimal space-y-1 pl-5">{children}</ol>
    case 'li':
      return <li key={key}>{children}</li>
    case 'blockquote':
      return <blockquote key={key} className="border-l-4 border-sage pl-4 italic">{children}</blockquote>
    default:
      return <p key={key} className={`leading-relaxed ${textColor}`}>{children}</p>
  }
}

export default function RichText({ content, textColor = 'text-charcoal/80' }: { content: unknown; textColor?: string }) {
  const root = content as { root?: { children?: LexicalNode[] } } | null
  const children = root?.root?.children

  if (!children || children.length === 0) {
    return null
  }

  return <div className="space-y-4">{children.map((node, i) => renderNode(node, i, textColor))}</div>
}