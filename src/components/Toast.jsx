import { useUI } from '../context/AppContext'

export default function Toast() {
  const { toast } = useUI()
  return <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
}
