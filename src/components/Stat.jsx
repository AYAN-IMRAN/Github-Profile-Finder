import React from "react";

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-sm">
      {/* Icon box */}
      <div className="rounded-xl bg-neutral-800 p-2">
        <Icon className="h-5 w-5" />
      </div>

      {/* Label and Value */}
      <div>
        <div className="text-xs text-neutral-400">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default Stat;
