const WA = import.meta.env.VITE_WA_NUMBER || '917987239233'

export default function FloatWA() {
  return (
    <a
      className="float-wa"
      href={`https://wa.me/${WA}?text=Hello%20Aditya%20Dryfruits!%20I%20want%20to%20place%20an%20order.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  )
}
