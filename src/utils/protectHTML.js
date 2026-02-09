export default function protectHTML(html) {
  const protectionScript = `
<style>*{user-select:none!important;-webkit-user-select:none!important}img{-webkit-user-drag:none;user-drag:none;pointer-events:none}</style>
<script>
document.addEventListener('contextmenu',function(e){e.preventDefault()});
document.addEventListener('keydown',function(e){
if(e.ctrlKey&&(e.key==='u'||e.key==='s'||e.key==='p'))e.preventDefault();
if(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'||e.key==='C'))e.preventDefault();
if(e.key==='F12')e.preventDefault();
});
document.addEventListener('dragstart',function(e){e.preventDefault()});
</script>`

  return html.replace('</head>', protectionScript + '\n</head>')
}
