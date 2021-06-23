export default function insertStyles(styleText) {
  const $style = document.createElement("style");
  document.head.appendChild($style);
  $style.innerHTML = styleText;

  return () => document.head.removeChild($style);
}
