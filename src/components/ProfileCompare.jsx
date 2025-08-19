import React, { useState } from "react";
import { Users, AlertTriangle } from "lucide-react";
import Shimmer from "./Shimmer";

// Tailwind dynamic color mapping (no runtime interpolation)
const highlightClasses = {
  cyan: "border-cyan-500",
  fuchsia: "border-fuchsia-500",
};

export default function ProfileCompare() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [compared, setCompared] = useState(false);

  async function fetchUser(username, setUser, setLoading, setError) {
    const u = (username || "").trim();
    if (!u) {
      setError("Please enter a username");
      setUser(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://api.github.com/users/${u}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found");
        if (res.status === 403) throw new Error("Rate limit exceeded");
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setUser(data);
    } catch (e) {
      setUser(null);
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCompare() {
    setCompared(true);
    // run both requests in parallel
    fetchUser(username1, setUser1, setLoading1, setError1);
    fetchUser(username2, setUser2, setLoading2, setError2);
  }

  const disableBtn =
    !username1.trim() || !username2.trim() || loading1 || loading2;

  const triggerOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!disableBtn) handleCompare();
    }
  };

  return (
    <section className="w-full">
      {/* Title + Inputs */}
      <div className="mx-auto max-w-4xl px-6 py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Compare two developers on GitHub
        </h2>
        <p className="mt-2 text-neutral-400 text-sm sm:text-base">
          Enter two usernames, then hit Compare.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="First username"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-600"
              value={username1}
              onChange={(e) => setUsername1(e.target.value)}
              onKeyDown={triggerOnEnter}
            />
            {error1 && compared && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-300">
                <AlertTriangle className="h-4 w-4" /> {error1}
              </p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Second username"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-600"
              value={username2}
              onChange={(e) => setUsername2(e.target.value)}
              onKeyDown={triggerOnEnter}
            />
            {error2 && compared && (
              <p className="mt-2 flex items-center gap-1 text-xs text-red-300">
                <AlertTriangle className="h-4 w-4" /> {error2}
              </p>
            )}
          </div>
        </div>

        {/* Compare Button */}
        <button
          onClick={handleCompare}
          disabled={disableBtn}
          className="mt-6 flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-900 px-6 py-3 font-medium hover:border-neutral-500 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
          aria-busy={loading1 || loading2}
        >
          <Users className="h-4 w-4" />
          {loading1 || loading2 ? "Comparing..." : "Compare"}
        </button>
      </div>

      {/* Profiles */}
      {compared && (
        <div className="mx-auto max-w-6xl px-6 pb-8 grid gap-6 sm:grid-cols-2">
          <ProfileCard
            user={user1}
            loading={loading1}
            error={error1}
            highlight="cyan"
          />
          <ProfileCard
            user={user2}
            loading={loading2}
            error={error2}
            highlight="fuchsia"
          />
        </div>
      )}

            {/* Comparison Result */}
      {compared && (
        <div className="mx-auto max-w-3xl px-6 pb-10">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center">
            {loading1 || loading2 ? (
              <>
                <Shimmer className="h-6 w-40 mx-auto mb-4" />
                <Shimmer className="h-4 w-64 mx-auto mb-2" />
                <Shimmer className="h-4 w-56 mx-auto" />
              </>
            ) : user1 && user2 ? (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Comparison Result
                </h3>

                <div className="space-y-3">
                  <p
                    className={`mb-2 ${
                      user1.followers > user2.followers
                        ? "text-cyan-400 font-medium"
                        : user2.followers > user1.followers
                        ? "text-fuchsia-400 font-medium"
                        : "text-neutral-300"
                    }`}
                  >
                    {user1.followers === user2.followers
                      ? "Both have equal followers"
                      : user1.followers > user2.followers
                      ? `${user1.login} has more followers (${user1.followers})`
                      : `${user2.login} has more followers (${user2.followers})`}
                  </p>

                  <p
                    className={`${
                      user1.public_repos > user2.public_repos
                        ? "text-cyan-400 font-medium"
                        : user2.public_repos > user1.public_repos
                        ? "text-fuchsia-400 font-medium"
                        : "text-neutral-300"
                    }`}
                  >
                    {user1.public_repos === user2.public_repos
                      ? "Both have equal repositories"
                      : user1.public_repos > user2.public_repos
                      ? `${user1.login} has more repositories (${user1.public_repos})`
                      : `${user2.login} has more repositories (${user2.public_repos})`}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-neutral-400">No comparison data yet.</p>
            )}
          </div>
        </div>
      )}

    </section>
  );
}

function ProfileCard({ user, loading, error, highlight = "cyan" }) {
  if (loading) {
    return (
      <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col items-center text-center">
        <Shimmer className="w-24 h-24 rounded-full mb-4" />
        <Shimmer className="w-32 h-5 mb-2" />
        <Shimmer className="w-20 h-4 mb-2" />
        <div className="flex gap-6 mt-4 w-full justify-center">
          <Shimmer className="w-16 h-4" />
          <Shimmer className="w-16 h-4" />
          <Shimmer className="w-16 h-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900/40 bg-red-950/30 p-6 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-red-900/40">
          <AlertTriangle className="h-5 w-5 text-red-300" />
        </div>
        <p className="text-sm text-red-200">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 text-center text-sm text-neutral-400">
        No data yet.
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col items-center text-center">
      <img
        src={user.avatar_url}
        alt={user.login}
        className={`w-24 h-24 rounded-full border-2 ${highlightClasses[highlight]}`}
      />
      <h2 className="mt-4 text-lg font-bold">{user.login}</h2>
      <p className="text-neutral-400 text-sm">{user.name || "No Name"}</p>
      <div className="mt-4 flex gap-6 text-sm">
        <div>
          <p className="font-semibold">{user.followers}</p>
          <span className="text-neutral-400">Followers</span>
        </div>
        <div>
          <p className="font-semibold">{user.public_repos}</p>
          <span className="text-neutral-400">Repos</span>
        </div>
        <div>
          <p className="font-semibold">{user.following}</p>
          <span className="text-neutral-400">Following</span>
        </div>
      </div>
    </div>
  );
}
