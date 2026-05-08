export async function logout() {
  const res = await fetch("/api/logout", {
    method: "POST",
  });

  return res.json();
}