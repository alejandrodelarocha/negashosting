'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lock, LogOut, MessageSquare, Loader2, Copy, Check } from 'lucide-react'

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-xs text-slate-400">
        <span>{language || 'code'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 hover:text-white transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  )
}

function renderMarkdown(text) {
  const parts = []
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {renderInlineMarkdown(text.slice(lastIndex, match.index))}
        </span>
      )
    }
    parts.push(
      <CodeBlock key={match.index} language={match[1]} code={match[2].trim()} />
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={lastIndex} className="whitespace-pre-wrap">
        {renderInlineMarkdown(text.slice(lastIndex))}
      </span>
    )
  }

  return parts
}

function renderInlineMarkdown(text) {
  return text.split(/(`[^`]+`)/).map((segment, i) => {
    if (segment.startsWith('`') && segment.endsWith('`')) {
      return (
        <code key={i} className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm">
          {segment.slice(1, -1)}
        </code>
      )
    }
    return segment
  })
}

function PassphraseGate({ onUnlock }) {
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (passphrase.toLowerCase().trim() === 'chiluta') {
      sessionStorage.setItem('letscode_auth', 'true')
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
      setPassphrase('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <motion.form
          onSubmit={handleSubmit}
          animate={error ? { x: [0, -12, 12, -12, 12, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <Lock className="text-cyan-400" size={28} />
            </div>
          </div>
          <h1 className="text-white text-xl font-bold text-center mb-2">Let&apos;s Code</h1>
          <p className="text-slate-400 text-sm text-center mb-6">Enter passphrase to continue</p>
          <input
            ref={inputRef}
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Passphrase"
            className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors ${
              error ? 'border-red-500' : 'border-slate-700'
            }`}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs mt-2 text-center"
            >
              Wrong passphrase
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
          >
            Unlock
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default function LetscodePage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem('letscode_auth') === 'true') {
      setAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleLogout = () => {
    sessionStorage.removeItem('letscode_auth')
    setAuthenticated(false)
    setMessages([])
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = '48px'
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `API error ${res.status}`)
      }

      const data = await res.json()
      const assistantText = data.content?.[0]?.text || data.content || 'No response'
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaInput = (e) => {
    setInput(e.target.value)
    e.target.style.height = '48px'
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
  }

  if (!authenticated) {
    return <PassphraseGate onUnlock={() => setAuthenticated(true)} />
  }

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-cyan-400" size={20} />
          <h1 className="text-white font-semibold text-lg">Let&apos;s Code</h1>
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">Claude Haiku</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-slate-400 hover:text-white transition-colors p-2"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
              <MessageSquare className="text-cyan-400" size={32} />
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">Start a conversation</h2>
            <p className="text-slate-400 max-w-md">Ask me anything about code, architecture, debugging, or any technical topic.</p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-md'
                    : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
                }`}
              >
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="text-cyan-400 animate-spin" size={16} />
              <span className="text-slate-400 text-sm">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Shift+Enter for new line)"
            rows={1}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            style={{ height: '48px', maxHeight: '200px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
