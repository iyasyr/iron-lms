import { useState } from 'react'
import { http } from '../api/http'

export default function HealthButton() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'down' | 'loading'>('idle')
  return (
    <button
      onClick={async () => {
        try {
          setStatus('loading'); const r = await http.get<{ status: string, db: string }>('/api/ping')
          setStatus(r.status === 'ok' ? 'ok' : 'down')
        } catch { setStatus('down') }
      }}
    >
      {status === 'idle' && 'Test connection'}
      {status === 'loading' && 'Checking…'}
      {status === 'ok' && 'Connection OK'}
      {status === 'down' && 'DB down'}
    </button>
  )
}
