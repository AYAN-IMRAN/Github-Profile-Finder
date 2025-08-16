import React, { useEffect, useState } from "react";
import { Github, AlertTriangle } from "lucide-react";
import ProfileCard from "./components/ProfileCard";
import SearchForm from "./components/SearchForm";
import { selectUserFields } from "./utils/selectUserFields";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  async function fetchProfile() {
    const next = (username || "").trim();
    if (!next) return;
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const uRes = await fetch(`https://api.github.com/users/${next}`);
      if (!uRes.ok) {
        if (uRes.status === 404) throw new Error("User not found");
        if (uRes.status === 403) throw new Error("Rate limit exceeded");
        throw new Error("Failed to fetch user");
      }
      const uJson = await uRes.json();
      setUser(selectUserFields(uJson));
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (triggerSearch) {
      fetchProfile();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-900/80 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-fuchsia-600/30 via-violet-600/30 to-cyan-500/30 blur" />
              <div className="relative flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-1.5">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base font-semibold">
                  GitHub Profile Finder
                </span>
              </div>
            </div>
          </div>
          <a
            href="https://github.com/AYAN-IMRAN/Github-Profile-Finder"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm opacity-70 hover:opacity-100"
          >
            Open on GitHub →
          </a>
        </div>
      </header>

      {/* Search Section */}
      <section className="border-b border-neutral-900 bg-gradient-to-b from-neutral-950 to-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-6 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Find any developer’s GitHub — fast
            </h1>
            <p className="mt-2 text-neutral-300 text-sm sm:text-base">
              Type a username, get clean profile insights instantly.
            </p>
          </div>

          <SearchForm
            username={username}
            setUsername={setUsername}
            onSearch={() => setTriggerSearch(true)}
          />

          {error && (
            <div className="mx-auto mt-4 flex max-w-lg items-center gap-2 rounded-xl border border-red-900/40 bg-red-950/30 p-3 text-xs sm:text-sm text-red-200">
              <AlertTriangle className="h-4 w-4" /> {error}
            </div>
          )}
        </div>
      </section>

      {/* Main Profile Section */}
      <main className="flex-grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex justify-center">
          <ProfileCard user={user} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-neutral-800 bg-neutral-900/60 p-4 sm:p-5 text-center text-xs sm:text-sm text-neutral-400">
        Developer by{" "}
        <a
          href="https://github.com/AYAN-IMRAN"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-neutral-200"
        >
          Ayan Imran
        </a>
      </footer>
    </div>
  );
}

export default App;
