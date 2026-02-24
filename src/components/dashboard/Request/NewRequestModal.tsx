import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateRequestMutation } from "@/redux/slice/requestApi";
import { toast } from "sonner";


const initialState = {
  title: "",
  topic: "",
  urgency: "",
  budgetRange: "",
  description: "",
}
export default function NewRequestModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  const [formdata, setFormdata] = useState(initialState)
  const [createRequest] = useCreateRequestMutation();

  const handleChange = (e: any) => {
    setFormdata((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleRequestSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formdata", formdata);
    try {
      const response = await createRequest(formdata)?.unwrap();
      console.log("response", response);
      if (response?.success) {
        toast.success(response?.message);
        onClose()
      }
    } catch (error: any) {
      toast.error(error?.data?.message)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-[#111111] border border-primary rounded-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Request</h2>
        <form onSubmit={handleRequestSubmit}>
          <div className="space-y-4">
            <input
              onChange={handleChange}
              name="title"
              placeholder="Title"
              className="w-full bg-[#111] border border-white/10  px-4 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                onChange={handleChange}
                name="topic"
                className="bg-[#111] border border-white/10 text-sm px-4 py-2">
                {[
                  { label: "Vacant Land", value: "Vacant Land" },
                  { label: "Farms", value: "Farms" },
                  { label: "Hotels", value: "Hotels" },
                  { label: "Investment Portfolios", value: "Investment Portfolios" },
                ]?.map(op => <option value={op?.value}>{op?.label}</option>)
                }</select>

              <select
                onChange={handleChange}
                name="urgency"
                className="bg-[#111] border border-white/10 text-sm px-4 py-2">
                {[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                  { label: "Urgent", value: "urgent" },
                ]?.map(op => <option value={op?.value}>{op?.label}</option>)
                }</select>

            </div>

            <input
              onChange={handleChange}
              name="budgetRange"
              placeholder="Budget Range (e.g. $2M – $5M)"
              className="w-full bg-[#111] border border-white/10  px-4 py-2 text-sm"
            />

            <textarea
              onChange={handleChange}
              name="description"
              rows={4}
              placeholder="Describe what you are looking for..."
              className="w-full bg-[#111] border border-white/10  px-4 py-2 text-sm resize-none"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button type="submit" className="bg-primary text-black px-4 py-2  text-sm font-medium hover:bg-[#F1D98A]">
                Post Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
