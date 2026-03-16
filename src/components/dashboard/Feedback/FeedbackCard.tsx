import { Loader2, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { StarRating } from "./StarRating";

const FeedbackCard = ({
  feedback,
  onEdit,
  onDelete,
  isDeleting,
}: {
  feedback: any;
  onEdit: (f: any) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) => (
  <div className="bg-[#111111] border border-primary/20 rounded-xl p-5 space-y-3 hover:border-primary/40 transition-colors">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-medium truncate">{feedback.title}</h3>
          {feedback.createdAt && (
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onEdit(feedback)}
          className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-primary/10"
        >
          <Pencil className="w-4 h-4" />
        </button>
        {/* <button
          onClick={() => onDelete(feedback._id)}
          disabled={isDeleting}
          className="p-1.5 text-gray-500 hover:text-red-500 transition-colors rounded-md hover:bg-red-500/10 disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button> */}
      </div>
    </div>

    <StarRating value={feedback.rating} readonly size="sm" />

    <p className="text-gray-400 text-sm leading-relaxed">{feedback.comment}</p>
  </div>
);

export default FeedbackCard;