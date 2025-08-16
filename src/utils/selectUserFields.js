export function selectUserFields(u) {
  if (!u) return null;
  return {
    login: u.login,
    name: u.name || u.login,
    avatar: u.avatar_url,
    bio: u.bio,
    followers: u.followers,
    following: u.following,
    repos: u.public_repos,
    location: u.location,
    createdAt: u.created_at,
    htmlUrl: u.html_url,
  };
}
