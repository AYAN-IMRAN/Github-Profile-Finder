import React from "react";
import { Users, BookOpen, MapPin } from "lucide-react";
import Shimmer from "./Shimmer";
import Stat from "./Stat";

function ProfileCard({ user, loading }) {

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-center">
        <Shimmer className="mx-auto h-24 w-24 sm:h-32 sm:w-32 rounded-full" />
        <Shimmer className="mx-auto mt-4 h-5 w-32 sm:w-40" />
        <Shimmer className="mx-auto mt-2 h-4 w-48 sm:w-64" />
      </div>
    );
  }

 
  if (!user) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-center text-sm text-neutral-400">
        Type a username and hit Search.
      </div>
    );
  }


  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-8 text-center max-w-md sm:max-w-lg md:max-w-xl mx-auto">
      {/* Avatar (profile picture) */}
      <div className="flex justify-center">
        <img
          src={user.avatar}
          alt={user.login}
          className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-2 border-neutral-700 object-cover shadow-md"
        />
      </div>

      {/* Name & Username */}
      <h2 className="mt-4 text-lg sm:text-xl font-semibold">{user.name}</h2>
      <a
        href={user.htmlUrl}
        target="_blank"
        rel="noreferrer"
        className="text-xs sm:text-sm text-neutral-400 hover:text-neutral-200 transition"
      >
        @{user.login}
      </a>

      {/* Bio */}
      {user.bio && (
        <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed px-2 sm:px-6">
          {user.bio}
        </p>
      )}

      {/* Followers & Repos */}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
        <Stat icon={Users} label="Followers" value={user.followers} />
        <Stat icon={BookOpen} label="Repos" value={user.repos} />
      </div>

      {/* Location */}
      {user.location && (
        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-300">
          <MapPin className="h-4 w-4" /> {user.location}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
