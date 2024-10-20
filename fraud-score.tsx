'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ShieldCheck, Wifi } from 'lucide-react'

export default function FuturisticIPChecker() {
  const [ip, setIp] = useState('')
  const [userIp, setUserIp] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFloating, setIsFloating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsFloating(ip.length > 0)
  }, [ip])

  const checkFraudScore = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setScore(Math.random() * 100)
    setLoading(false)
  }

  const fetchUserIp = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const simulatedIp = '192.168.1.' + Math.floor(Math.random() * 255)
    setUserIp(simulatedIp)
    setIp(simulatedIp)
    setLoading(false)
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        className="absolute top-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="relative">
          <ShieldCheck className="w-24 h-24 text-indigo-400" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 pt-16 mt-16 max-w-md w-full space-y-8 border border-indigo-500/30"
      >
        <div className="text-center relative">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">IP Fraud Detector</h2>
          <p className="mt-2 text-sm text-indigo-300">Enter an IP address to check its fraud score</p>
        </div>
        <form onSubmit={checkFraudScore} className="mt-8 space-y-6">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              required
              className="peer w-full px-3 py-4 text-white bg-indigo-900/50 rounded-lg border-2 border-indigo-500/50 focus:border-indigo-400 focus:outline-none transition-colors duration-300"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <label
              className={`absolute left-3 ${
                isFloating ? '-top-6 text-sm' : 'top-4'
              } text-indigo-300 transition-all duration-300 pointer-events-none ${
                isFloating ? 'opacity-100' : 'peer-focus:-top-6 peer-focus:text-sm peer-focus:opacity-100'
              }`}
            >
              Enter IP Address
            </label>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  CHECK FRAUD SCORE
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchUserIp}
              className="w-full flex justify-center items-center py-3 px-4 border border-indigo-500 text-sm font-bold rounded-lg text-indigo-400 bg-transparent hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Wifi className="w-5 h-5 mr-2" />
                  𝗖𝗛𝗘𝗖𝗞 𝗢𝗪𝗡 𝗜𝗣 𝗦𝗖𝗢𝗥𝗘
                </>
              )}
            </motion.button>
          </div>
        </form>

        <AnimatePresence>
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold text-white">Fraud Score Result</h3>
              <div className="mt-2 p-4 bg-indigo-900/50 rounded-lg border border-indigo-500/50">
                <p className="text-sm text-indigo-300">The fraud score for IP {ip} is:</p>
                <p className="text-4xl font-extrabold text-indigo-400 mt-2">{score.toFixed(2)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      </motion.div>
    </div>
  )
}