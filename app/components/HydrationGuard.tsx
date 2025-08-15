'use client'

import { useEffect, useState } from 'react'

export default function HydrationZuard({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated ? <>{children}</> : <div className="w-full h-screen flex items-center justify-center"><div className="loader"></div></div>
}
