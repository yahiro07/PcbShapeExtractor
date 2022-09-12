// XML.js
// https://gist.github.com/max-pub/a5c15b7831bbfaba7ad13acefc3d0781
const XML = {
  parse: (string: string, type = 'text/xml') =>
    new DOMParser().parseFromString(string, type as any),
  prettify: (node: any) => XML.toString(node, true),
  toString: (
    node: any,
    pretty: boolean,
    level = 0,
    singleton = false
  ): string => {
    // einzelkind
    if (typeof node === 'string') node = XML.parse(node);
    const tabs = pretty
      ? Array(level + 1)
          .fill('')
          .join('\t')
      : '';
    const newLine = pretty ? '\n' : '';
    if (node.nodeType === 3)
      return (
        (singleton ? '' : tabs) +
        node.textContent?.trim() +
        (singleton ? '' : newLine)
      );
    if (!node.tagName) return XML.toString(node.firstChild, pretty);
    let output = tabs + `<${node.tagName}`; // >\n
    for (let i = 0; i < node.attributes.length; i++)
      output += ` ${node.attributes[i].name}="${node.attributes[i].value}"`;
    if (node.childNodes.length === 0) return output + ' />' + newLine;
    else output += '>';
    const onlyOneTextChild =
      node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;
    if (!onlyOneTextChild) output += newLine;
    for (let i = 0; i < node.childNodes.length; i++)
      output += XML.toString(
        node.childNodes[i],
        pretty,
        level + 1,
        onlyOneTextChild
      );
    return (
      output + (onlyOneTextChild ? '' : tabs) + `</${node.tagName}>` + newLine
    );
  },
};

export function svgExporter_openDomSvgImageInNewTab(svgElement: SVGSVGElement) {
  const svgTextRaw = new XMLSerializer().serializeToString(svgElement);
  const svgText = XML.prettify(svgTextRaw);
  const dataUrl = `data:image/svg+xml;base64,${btoa(
    unescape(encodeURIComponent(svgText))
  )}`;
  const win = window.open()!;
  win.document.write(`<img src="${dataUrl}" />`);
}
