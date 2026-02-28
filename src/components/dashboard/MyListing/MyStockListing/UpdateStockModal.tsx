"use client";
import React, { useState, useEffect } from "react";
import { Plus, X, ImageIcon, Loader2 } from "lucide-react";
import { Button, FormControlLabel, Grid, Switch } from "@mui/material";
import { toast } from "sonner";
import { useUpdateStockMutation } from "@/redux/slice/stocksApi";
import { getImageUrl } from "@/utils/baseUrl";
import ImagesUpload from "@/components/shared/ImagesUpload";

interface StockData {
  _id: string;
  title: string;
  description: string;
  price: string;
  size: string;
  location: string;
  features: string[];
  images?: { url: string; public_id: string }[];
}

interface UpdateStockModalProps {
  open: boolean;
  onClose: () => void;
  stock: any | null;
}

export default function UpdateStockModal({
  open,
  onClose,
  stock,
}: UpdateStockModalProps) {
  if (!open || !stock) return null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    location: "",
    features: [""] as string[],
    newImages: [] as File[],
    removedImageIds: [] as string[],
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateStock] = useUpdateStockMutation();

  const [isBlur, setIsBlur] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);


  console.log("isBlur",isBlur);
  
  const handleClose = () => {
    setImageFiles([])
    setExistingImages([]);
    onClose()
  }

  // Populate form with existing stock data
  useEffect(() => {
    if (stock) {
      setFormData({
        title: stock.title || "",
        description: stock.description || "",
        price: stock.price || "",
        size: stock.size || "",
        location: stock.location || "",
        features:
          stock.features?.length > 0 ? stock.features : [""],
        newImages: [],
        removedImageIds: [],
      });
      setExistingImages(stock?.images);
      setIsBlur(stock?.isBlur);
    }
  }, [stock]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new FormData();

    const data = {
      title: formData.title,
      price: formData.price,
      location: formData.location,
      size: formData.size,
      description: formData.description,
      features: formData.features.filter((f) => f.trim() !== ""),
      isBlur,      
    };

    payload.append("data", JSON.stringify(data));

    if (imageFiles?.length) {
      imageFiles.forEach((file) => {
        payload.append("images", file);
      });
    }

    try {
      const response = await updateStock({
        id: stock._id,
        payload,
      })?.unwrap();

      if (response?.success) {
        toast.success(response?.message || "Stock updated successfully");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update stock");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm py-8 px-4">
      <div className="relative w-full max-w-3xl h-[80vh] overflow-auto bg-[#0D0D0D] rounded-2xl border border-primary/30 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0D0D0D] border-b border-primary/20 rounded-t-2xl px-8 py-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-serif text-white">
              Update Stock Listing
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Edit the details of this property listing
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-8">
            <h2 className="text-xl font-serif text-white mb-6">
              Basic Information
            </h2>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Exclusive Beachfront Villa"
                className="w-full bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Property Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the property in detail..."
                className="w-full bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none resize-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum 100 characters recommended
              </p>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-8">
            <h2 className="text-xl font-serif text-white mb-6">
              Financial Details
            </h2>

            {/* Price */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Price Range *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g., R 5M - R 7M or $5M - $7M"
                className="w-full bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Size *
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                placeholder="e.g., 50 - 100 hectares"
                className="w-full bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-8">
            <h2 className="text-xl font-serif text-white mb-6">Location</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Location (General Area) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Coastal Region, Western Cape"
                className="w-full bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Keep location vague for privacy. Exact address will be
                shared after NDA.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-white">Key Features</h2>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(index, e.target.value)
                    }
                    placeholder="e.g., 5 Bedrooms, Infinity Pool, Home Cinema"
                    className="flex-1 bg-[#0A0A0A] border border-primary/40 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Add key features like bedrooms, bathrooms, special amenities, etc.
            </p>
          </div>

          {/* Gallery Images */}
          <div className="bg-[#111111] border border-primary/20 rounded-xl p-8">
            <h2 className="text-xl font-serif text-white mb-2">
              Gallery Images
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Existing images are shown below. Remove any you'd like to replace
              and upload new ones.
            </p>
            <Grid>
              <ImagesUpload
                files={imageFiles}
                onChange={setImageFiles}
                existingImages={existingImages}
                onRemoveExisting={(index) => {
                  setExistingImages(existingImages.filter((_, i) => i !== index));
                }}
              />

              <p className="text-xs text-gray-300  mt-3">
                <FormControlLabel
                  
                  control={
                    <Switch
                      checked={isBlur}
                      size="medium"
                      color="warning"
                      onChange={(e) => setIsBlur(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-track': {
                          backgroundColor: '#374151', // gray-700
                        },
                        '& .Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#f59e0b', // warning amber
                        },
                      }}
                    />
                  }
                  label="Blur Image"
                  sx={{
                    color: '#e5e7eb', // gray-200
                    '.MuiFormControlLabel-asterisk': {
                      color: '#f87171', // red-400
                    },
                  }}
                />
              </p>
            </Grid>

          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-6 border-t border-primary/20">
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={isSubmitting}
              className="w-full md:flex-1 bg-primary! sm:flex-none"
              startIcon={
                isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : undefined
              }
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full md:flex-1 sm:flex-none px-6 py-3 bg-[#1A1A1A] text-white border border-primary/20 rounded-lg hover:border-primary hover:bg-[#2A2A2A] transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}