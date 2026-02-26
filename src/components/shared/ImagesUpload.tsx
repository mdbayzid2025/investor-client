import { getImageUrl } from '@/utils/baseUrl';

import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { ImagePlus, X } from 'lucide-react';
import * as React from 'react';

interface ImagesUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
  existingImages?: string[]; // URLs of existing images (for edit mode)
  onRemoveExisting?: (index: number) => void;
}

export default function ImagesUpload({
  files,
  onChange,
  maxImages = 5,
  existingImages = [],
  onRemoveExisting
}: ImagesUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = React.useState<string[]>([]);

  // Generate previews for new files
  React.useEffect(() => {
    const newPreviews: string[] = [];
    const readers: Promise<string>[] = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setPreviews(results);
    });

    // Cleanup previews
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [files]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const totalImages = (existingImages?.length ?? 0 )+ (files?.length ?? 0);
      const remainingSlots = maxImages - totalImages;
      const filesToAdd = Array.from(selectedFiles).slice(0, remainingSlots);

      onChange([...files, ...filesToAdd]);
    }

    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const totalImages = (existingImages?.length ?? 0) + (files?.length ?? 0);
  const canAddMore = totalImages < maxImages;

  console.log("filesfiles", files);
  

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Existing Images (from server) */}
        {existingImages?.map((imageSrc, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`existing-${index}`}>
            <Paper
              sx={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.1)',
              }}
            >
              <Box
                component="img"
                src={`${getImageUrl()}${imageSrc}`}
                alt={`Existing ${index + 1}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {onRemoveExisting && (
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255,0,0,0.8)',
                    },
                  }}
                  onClick={() => onRemoveExisting(index)}
                >
                  <X fontSize="small" />
                </IconButton>
              )}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  left: 4,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                }}
              >
                Existing
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* New File Previews */}
        {previews?.map((preview, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`new-${index}`}>
            <Paper
              sx={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                border: '2px solid rgba(207, 151, 2, 0.5)',
              }}
            >
              <Box
                component="img"
                src={preview}
                alt={`New ${index + 1}`}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,0,0,0.8)',
                  },
                }}
                onClick={() => handleRemoveFile(index)}
              >
                <X fontSize="small" />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  left: 4,
                  backgroundColor: 'rgba(207, 151, 2, 0.8)',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                }}
              >
                New
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* Add Image Button */}
        {canAddMore && (
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <ButtonBase
              component="label"
              role={undefined}
              tabIndex={-1}
              aria-label="Upload product images"
              sx={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
                borderRadius: 2,
                border: '2px dashed rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&:has(:focus-visible)': {
                  outline: '2px solid',
                  outlineOffset: '2px',
                },
              }}
            >
              <Stack
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImagePlus
                  size={40}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "8px",
                  }}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Add Image
                </Typography>
              </Stack>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{
                  border: 0,
                  clip: 'rect(0 0 0 0)',
                  height: '1px',
                  margin: '-1px',
                  overflow: 'hidden',
                  padding: 0,
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  width: '1px',
                }}
                onChange={handleImageChange}
              />
            </ButtonBase>
          </Grid>
        )}
      </Grid>

      {!canAddMore && (
        <Typography variant="caption" sx={{ color: 'warning.main', mt: 1, display: 'block' }}>
          Maximum {maxImages} images allowed
        </Typography>
      )}
    </Box>
  );
}