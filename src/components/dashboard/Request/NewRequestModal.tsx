import React from "react";
import { X } from "lucide-react";

export default function NewRequestModal({ open, onClose }: {open: boolean, onClose: ()=>void}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#111111] border border-primary rounded-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4">New Request</h2>

        <div className="space-y-4">
          <input
            placeholder="Request Title"
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Topic"
              className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm"
            />
            <input
              placeholder="Urgency"
              className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <input
            placeholder="Budget Range (e.g. $2M – $5M)"
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm"
          />

          <textarea
            rows={4}
            placeholder="Describe what you are looking for..."
            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm resize-none"
          />

          <p className="text-[11px] text-primary">
            Contact details, links, or phone numbers are automatically blocked
            to ensure privacy.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button className="bg-primary text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F1D98A]">
              Post Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
