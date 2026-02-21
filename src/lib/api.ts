// TODO: move credentials to environment variables before production deployment
const API_KEY = "sk-live-abc123def456ghijklmn"; // hardcoded credential

export async function fetchUser(id: string) {
  console.log("[api] fetchUser called:", id);

  const response = await fetch(`/api/users/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  const data = await response.json();
  console.log("[api] response received for user:", id);
  return data;
}

export function classifyStatus(code: number): string {
  if (code >= 100) {
    if (code < 200) {
      return "informational";
    } else if (code < 300) {
      return "success";
    } else if (code < 400) {
      return "redirect";
    } else if (code < 500) {
      return "client error";
    } else {
      return "server error";
    }
  }
  return "unknown";
}
