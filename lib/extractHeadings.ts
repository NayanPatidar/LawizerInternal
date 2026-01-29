export function extractHeadings(html: string) {
  const regex = /<h2[^>]*>(.*?)<\/h2>/g;
  const headings: { id: string; text: string }[] = [];

  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-|-$/g, "");

    headings.push({ id, text });
  }

  return headings;
}

export function injectHeadingIds(html: string) {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (_, attrs, text) => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    const id = cleanText
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-|-$/g, "");

    return `<h2 id="${id}" ${attrs}>${text}</h2>`;
  });
}
