export async function getReels() {
  const res = await fetch(
    "https://api.pexels.com/v1/videos/search?query=people&orientation=portrait&per_page=10",
    {
      headers: {
        Authorization: "Gn6prUXrrB2S0QebTUkT0JMhnwAwfK7vhnVL3EGpGPXp0EqYM4574GH0",
      },
    }
  );

  const data = await res.json();
  return data.videos;
}