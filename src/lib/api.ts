const API_KEY = process.env.API_KEY;

export async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return response.json();
}

export function classifyStatus(code: number): string {
  if (code < 100) return "unknown";
  if (code < 200) return "informational";
  if (code < 300) return "success";
  if (code < 400) return "redirect";
  if (code < 500) return "client error";
  return "server error";
}
