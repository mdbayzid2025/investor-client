"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  CheckCircle,
  AlertCircle,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetFeedbacksQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} from "@/redux/slice/feedbackApi";
import { StarRating } from "./StarRating";
import FeedbackCard from "./FeedbackCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feedback {
  _id: string;
  title: string;
  comment: string;
  rating: number;
  createdAt?: string;
}

interface FeedbackFormState {
  title: string;
  comment: string;
  rating: number;
}

const emptyForm: FeedbackFormState = { title: "", comment: "", rating: 5 };

// ─── Feedback Form ────────────────────────────────────────────────────────────

const FeedbackForm = ({
  initial = emptyForm,
  onSave,
  onCancel,
  isSaving,
  label = "Submit Feedback",
}: {
  initial?: FeedbackFormState;
  onSave: (data: FeedbackFormState) => void;
  onCancel: () => void;
  isSaving: boolean;
  label?: string;
}) => {
  const [form, setForm] = useState<FeedbackFormState>(initial);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.comment.trim()) return setError("Comment is required.");
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          placeholder="Give your feedback a title"
          className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Comment
        </label>
        <textarea
          value={form.comment}
          onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
          placeholder="Share your experience..."
          rows={4}
          className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Rating
        </label>
        <div className="flex items-center gap-3">
          <StarRating
            value={form.rating}
            onChange={(v) => setForm((p) => ({ ...p, rating: v }))}
          />
          <span className="text-sm text-gray-400">{form.rating} / 5</span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-black font-medium py-2 px-5 rounded-lg hover:bg-[#B89A2C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {label}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-2 border border-primary/20 text-gray-300 font-medium py-2 px-5 rounded-lg hover:border-primary/50 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  );
};

// ─── Feedback Card ────────────────────────────────────────────────────────────



// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Feedback() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: feedbackData, refetch } = useGetFeedbacksQuery({});
  const [createFeedback, { isLoading: isCreating }] = useCreateFeedbackMutation();
  const [updateFeedback, { isLoading: isUpdating }] = useUpdateFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedbacks: Feedback[] = feedbackData?.data || feedbackData || [];

  const handleCreate = async (data: FeedbackFormState) => {
    try {
      const response = await createFeedback(data).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Feedback submitted successfully");
        setShowAddForm(false);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit feedback");
    }
  };

  const handleUpdate = async (data: FeedbackFormState) => {
    if (!editingFeedback) return;
    try {
      const response = await updateFeedback({ id: editingFeedback._id, ...data }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Feedback updated successfully");
        setEditingFeedback(null);
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update feedback");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await deleteFeedback(id).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Feedback deleted");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete feedback");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
          Feedback
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Share your thoughts and help us improve
        </p>
      </div>

      <div className="space-y-6">

        {/* Add Feedback Button / Form */}
        {showAddForm ? (
          <div className="bg-[#111111] p-6 rounded-xl border border-primary/20">
            <h2 className="text-lg font-medium text-white mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              New Feedback
            </h2>
            <FeedbackForm            
              onSave={handleCreate}
              onCancel={() => setShowAddForm(false)}
              isSaving={isCreating}
              label="Submit Feedback"
            />
          </div>
        ) : (
          !feedbacks?.length && <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-primary/30 text-gray-400 hover:text-primary hover:border-primary/60 transition-colors rounded-xl py-4 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Feedback</span>
          </button>
        )}

        {/* Edit Form (inline above the card being edited) */}
        {editingFeedback && (
          <div className="bg-[#111111] p-6 rounded-xl border border-primary/40">
            <h2 className="text-lg font-medium text-white mb-5 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              Edit Feedback
            </h2>
            <FeedbackForm
              initial={{
                title: editingFeedback.title,
                comment: editingFeedback.comment,
                rating: editingFeedback.rating,
              }}
              onSave={handleUpdate}
              onCancel={() => setEditingFeedback(null)}
              isSaving={isUpdating}
              label="Save Changes"
            />
          </div>
        )}

        {/* Feedback List */}
        {feedbacks.length === 0 && !showAddForm ? (
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-10 text-center">
            <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No feedback yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <FeedbackCard
                key={fb._id}
                feedback={fb}
                onEdit={(f) => {
                  setEditingFeedback(f);
                  setShowAddForm(false);
                }}
                onDelete={handleDelete}
                isDeleting={deletingId === fb._id}
              />
            ))}
          </div>
        )}

        {/* Summary bar */}
        {feedbacks.length > 0 && (
          <div className="bg-[#1A1A1A] border border-primary/10 rounded-lg px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{feedbacks.length} feedback{feedbacks.length !== 1 ? "s" : ""} total</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-400">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span>
                Avg:{" "}
                <span className="text-white font-medium">
                  {(
                    feedbacks.reduce((sum, f) => sum + f.rating, 0) /
                    feedbacks.length
                  ).toFixed(1)}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}