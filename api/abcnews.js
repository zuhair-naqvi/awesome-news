const getNews = async () => {
  try {
    let response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=http://www.abc.net.au/news/feed/51120/rss.xml"
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export { getNews };
