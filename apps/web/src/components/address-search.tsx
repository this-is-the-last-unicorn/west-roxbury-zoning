'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type SearchResult = {
  gisId: string
  address: string
  proposedDistrict: string | null
}

export function AddressSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const router = useRouter()

  const doSearch = useCallback(async (q: string) => {
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(q)}`)
      const data: SearchResult[] = await res.json()
      setResults(data)
      setNoResults(data.length === 0)
      setOpen(true)
    } catch {
      setResults([])
      setNoResults(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)

      const trimmed = value.trim()
      if (trimmed.length < 2) {
        setResults([])
        setOpen(false)
        setNoResults(false)
        setLoading(false)
        return
      }

      setLoading(true)
      setNoResults(false)

      debounceRef.current = setTimeout(() => {
        doSearch(trimmed)
      }, 250)
    },
    [doSearch]
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(result: SearchResult) {
    setQuery(result.address)
    setOpen(false)
    router.push(`/property/${result.gisId}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (results.length === 1) {
      handleSelect(results[0])
    } else if (results.length > 1) {
      handleSelect(results[0])
    }
  }

  return (
    <div ref={wrapperRef} className='relative w-full max-w-lg mx-auto'>
      <form onSubmit={handleSubmit} className='flex gap-3'>
        <div className='relative flex-1'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]' />
          <input
            type='text'
            placeholder='Enter your address (e.g. 156 Centre St)'
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            className='w-full pl-12 pr-4 py-4 rounded-full border border-[#E2E8F0] text-base focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] focus:border-transparent'
            autoComplete='off'
            aria-label='Search address'
            aria-expanded={open}
            role='combobox'
            aria-controls='search-results'
          />
          {loading && (
            <Loader2 className='absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8] animate-spin' />
          )}
        </div>
        <button
          type='submit'
          className='px-8 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#2D4A7A] transition-colors'
        >
          Look it up
        </button>
      </form>

      {open && (
        <div
          id='search-results'
          role='listbox'
          className='absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50 overflow-hidden'
        >
          {results.length > 0 ? (
            results.map(r => (
              <button
                key={r.gisId}
                role='option'
                aria-selected={false}
                onClick={() => handleSelect(r)}
                className='w-full text-left px-5 py-3 hover:bg-[#F1F5F9] transition-colors border-b border-[#F1F5F9] last:border-0'
              >
                <span className='font-medium text-[#0F172A]'>{r.address}</span>
                {r.proposedDistrict && (
                  <span className='ml-2 text-sm text-[#64748B]'>→ {r.proposedDistrict}</span>
                )}
              </button>
            ))
          ) : noResults ? (
            <div className='px-5 py-4 text-sm text-[#64748B]'>
              <p className='font-medium'>No properties found for &ldquo;{query}&rdquo;</p>
              <p className='mt-1'>
                Try a street address in West Roxbury, or{' '}
                <a href='/map' className='text-[#1B2A4A] underline'>
                  browse the map
                </a>{' '}
                instead.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
