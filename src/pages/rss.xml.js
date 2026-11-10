import rss from "@astrojs/rss";

export function GET(context) {
  return rss({
    title: "rss",
    description: "rss",
    site: "https://ab.co/rss",
    items: [],
    customData: `<language>en-us</language>`,
  });
}
