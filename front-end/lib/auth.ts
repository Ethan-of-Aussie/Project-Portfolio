export function getUserIdFromToken() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  const payload = token.split(".")[1];
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const decodedPayload = JSON.parse(atob(base64));

  return decodedPayload.id;
}
