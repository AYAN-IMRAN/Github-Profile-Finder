import React from "react";
import { Search } from "lucide-react";

function SearchForm({ username, setUsername, onSearch }) {
  // Form submit handle karne ka simple function
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
      {/* Input field */}
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Github Username..."
          className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 py-3 pl-9 pr-4 outline-none ring-0 placeholder:text-neutral-500 focus:border-neutral-600"
        />
      </div>

      {/* Search button */}
      <button
        type="submit"
        className="rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-3 font-medium hover:border-neutral-500 hover:bg-neutral-800"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
