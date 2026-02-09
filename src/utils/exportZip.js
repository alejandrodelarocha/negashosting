import JSZip from 'jszip'
import generateHTML from './generateHTML'

export default async function exportAsZip(state) {
  const zip = new JSZip()

  let html = generateHTML(state)

  // Extract base64 images and replace with file references
  const regex = /data:(image\/[\w+]+);base64,([A-Za-z0-9+/=]+)/g
  let imageIndex = 0
  const images = []
  let match

  while ((match = regex.exec(html)) !== null) {
    imageIndex++
    const mimeType = match[1]
    const base64Data = match[2]
    const ext = mimeType.split('/')[1].replace('+xml', '')
    const filename = `image-${imageIndex}.${ext === 'jpeg' ? 'jpg' : ext}`

    const binaryString = atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    images.push({ filename, bytes, fullMatch: match[0] })
  }

  for (const img of images) {
    html = html.replace(img.fullMatch, `images/${img.filename}`)
    zip.file(`images/${img.filename}`, img.bytes)
  }

  zip.file('index.html', html)

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${state.title || 'website'}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
