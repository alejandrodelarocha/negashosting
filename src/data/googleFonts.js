const GOOGLE_FONTS = [
  { name: 'Outfit', value: 'Outfit' },
  { name: 'Inter', value: 'Inter' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Open Sans', value: 'Open+Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Playfair Display', value: 'Playfair+Display' },
  { name: 'Merriweather', value: 'Merriweather' },
  { name: 'Lora', value: 'Lora' },
  { name: 'Libre Baskerville', value: 'Libre+Baskerville' },
  { name: 'DM Sans', value: 'DM+Sans' },
  { name: 'Space Grotesk', value: 'Space+Grotesk' },
  { name: 'Sora', value: 'Sora' },
  { name: 'Nunito', value: 'Nunito' },
  { name: 'Quicksand', value: 'Quicksand' },
  { name: 'Oswald', value: 'Oswald' },
  { name: 'Archivo', value: 'Archivo' },
  { name: 'Barlow', value: 'Barlow' },
  { name: 'Cabin', value: 'Cabin' },
  { name: 'Rubik', value: 'Rubik' },
  { name: 'Work Sans', value: 'Work+Sans' },
  { name: 'Josefin Sans', value: 'Josefin+Sans' },
  { name: 'Dela Gothic One', value: 'Dela+Gothic+One' },
]

export default GOOGLE_FONTS

export function getFontUrl(fontValue) {
  return `https://fonts.googleapis.com/css2?family=${fontValue}:wght@300;400;600;700&display=swap`
}
