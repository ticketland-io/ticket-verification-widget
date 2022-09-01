const inject = (element, html) => {
  const injectTo = document.querySelector(element);
  injectTo.innerHTML = html;
}

export default inject
 