export default function LogoUpload({ logo, dispatch }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      dispatch({ type: 'SET_LOGO', payload: { dataUrl: reader.result, fileName: file.name } })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="builder-field">
      <label className="builder-label">Logo</label>
      {logo ? (
        <div className="logo-preview">
          <img src={logo.dataUrl} alt="Logo" />
          <button onClick={() => dispatch({ type: 'CLEAR_LOGO' })} className="builder-btn-sm danger">Quitar</button>
        </div>
      ) : (
        <label className="logo-upload-zone">
          <input type="file" accept="image/*" onChange={handleFile} hidden />
          <span>Subir logo</span>
        </label>
      )}
    </div>
  )
}
