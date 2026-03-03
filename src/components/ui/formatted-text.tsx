import React from "react"
import { motion } from "framer-motion"

/**
 * FormattedText - A generic component that parses inline markers and renders formatted text.
 *
 * Supported markers:
 *   __text__   → bold
 *   _text_     → italic
 *   ~~text~~   → strikethrough
 *   `text`     → inline code
 *   ==text==   → highlight
 *
 * Supports an `animated` prop for word-by-word fade-in animation (like WordFadeIn).
 */

type Wrapper = (content: React.ReactNode, key: string) => React.ReactNode

// A flat segment: plain text with a stack of formatting wrappers to apply
type Segment = { text: string; wrappers: Wrapper[] }

// Order matters: longer/more-specific delimiters first to avoid conflicts (e.g. __ before _)
const RULES: { pattern: RegExp; wrap: Wrapper }[] = [
    {
        pattern: /__(.*?)__/g,
        wrap: (content, key) => <strong key={key}>{content}</strong>,
    },
    {
        pattern: /~~(.*?)~~/g,
        wrap: (content, key) => <s key={key}>{content}</s>,
    },
    {
        pattern: /==(.*?)==/g,
        wrap: (content, key) => (
            <mark key={key} className="bg-primary/20 text-primary px-1 rounded">
                {content}
            </mark>
        ),
    },
    {
        pattern: /`(.*?)`/g,
        wrap: (content, key) => (
            <code key={key} className="bg-muted text-sm px-1.5 py-0.5 rounded font-mono">
                {content}
            </code>
        ),
    },
    {
        pattern: /(?<![a-zA-Z0-9])_(.*?)_(?![a-zA-Z0-9])/g,
        wrap: (content, key) => <em key={key}>{content}</em>,
    },
]

/**
 * Parse text into flat segments, each carrying the formatting wrappers that should be applied.
 */
function parseToSegments(text: string, ruleIndex: number = 0, parentWrappers: Wrapper[] = []): Segment[] {
    if (ruleIndex >= RULES.length) {
        return text.length > 0 ? [{ text, wrappers: parentWrappers }] : []
    }

    const rule = RULES[ruleIndex]
    const segments: Segment[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    rule.pattern.lastIndex = 0

    while ((match = rule.pattern.exec(text)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
            segments.push(...parseToSegments(text.slice(lastIndex, match.index), ruleIndex + 1, parentWrappers))
        }
        // Matched content — add this rule's wrapper and recurse
        segments.push(...parseToSegments(match[1], ruleIndex + 1, [...parentWrappers, rule.wrap]))
        lastIndex = rule.pattern.lastIndex
    }

    // Remaining text
    if (lastIndex < text.length) {
        segments.push(...parseToSegments(text.slice(lastIndex), ruleIndex + 1, parentWrappers))
    }

    return segments
}

/**
 * Split segments into word-level segments, preserving formatting context.
 */
function segmentsToWords(segments: Segment[]): Segment[] {
    const words: Segment[] = []
    for (const seg of segments) {
        const parts = seg.text.split(/(\s+)/)
        for (const part of parts) {
            if (part.length > 0 && part.trim().length > 0) {
                words.push({ text: part, wrappers: seg.wrappers })
            }
        }
    }
    return words
}

/**
 * Render a word by applying all its formatting wrappers.
 */
function renderWord(word: Segment, wordIndex: number): React.ReactNode {
    let node: React.ReactNode = word.text
    // Apply wrappers from innermost to outermost
    for (let i = word.wrappers.length - 1; i >= 0; i--) {
        node = word.wrappers[i](node, `fmt-${wordIndex}-${i}`)
    }
    return node
}

// ── Static rendering (original applyRules approach) ──

function applyRules(text: string, ruleIndex: number = 0): React.ReactNode[] {
    if (ruleIndex >= RULES.length) {
        return [text]
    }

    const rule = RULES[ruleIndex]
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    rule.pattern.lastIndex = 0

    while ((match = rule.pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(...applyRules(text.slice(lastIndex, match.index), ruleIndex + 1))
        }
        const innerContent = applyRules(match[1], ruleIndex + 1)
        parts.push(rule.wrap(
            innerContent.length === 1 && typeof innerContent[0] === "string"
                ? innerContent[0]
                : <>{innerContent}</>,
            `fmt-${ruleIndex}-${match.index}`
        ))
        lastIndex = rule.pattern.lastIndex
    }

    if (lastIndex < text.length) {
        parts.push(...applyRules(text.slice(lastIndex), ruleIndex + 1))
    }

    return parts.length > 0 ? parts : [text]
}

// ── Component ──

// Narrow, explicit list of elements that can have children
type AllowedElement = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'td' | 'th' | 'label'

interface FormattedTextProps {
    children: string
    className?: string
    as?: AllowedElement
    animated?: boolean
    delay?: number
}

// Use explicit function signature instead of React.FC for better type inference
const FormattedText = ({
    children,
    className,
    as: Tag = "span",
    animated = false,
    delay = 0,
}: FormattedTextProps): React.JSX.Element => {
    if (animated) {
        const segments = parseToSegments(children)
        const words = segmentsToWords(segments)

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                            staggerChildren: 0.05,
                            delayChildren: delay,
                        },
                    },
                }}
                className={`${className ?? ""} flex flex-wrap`}
            >
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        className="inline-block mr-[0.25em]"
                    >
                        {renderWord(word, i)}
                    </motion.span>
                ))}
            </motion.div>
        )
    }

    const formatted = applyRules(children)
    return <Tag className={className}>{formatted}</Tag>
}

export default FormattedText;