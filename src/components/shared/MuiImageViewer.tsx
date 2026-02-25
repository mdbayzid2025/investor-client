
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";

interface MuiImageViewerProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const MuiImageViewer: React.FC<MuiImageViewerProps> = ({
  src,
  alt = "image",
  width = "100%",
  height = "auto",
  style = {},
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box position="relative" display="inline-block" style={style}>
      {/* Image with Zoom Icon */}
      <div className="relative group" style={{ width, height,  }}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height, borderRadius: 8, cursor: "pointer", objectFit: "cover" }}          
        />

        <div onClick={handleOpen} className="text-xs whitespace-nowrap group-hover:flex hidden cursor-pointer bg-black/50 text-white absolute top-0 left-0 z-10 h-full w-full  items-center justify-center">
          {alt}
        </div>
      </div>            

      {/* Preview Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.5)", color: "#fff", zIndex: 10 }}
          >
            <X />
          </IconButton>
          <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MuiImageViewer;
