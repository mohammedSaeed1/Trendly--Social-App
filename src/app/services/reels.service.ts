export async function getReels() {
  const res = await fetch(
    "https://api.pexels.com/videos/popular&orientation=portrait",
    {
      headers: {
        Authorization: "Gn6prUXrrB2S0QebTUkT0JMhnwAwfK7vhnVL3EGpGPXp0EqYM4574GH0",
      },
    }
  );

  const data = await res.json();
  return data.videos;
}