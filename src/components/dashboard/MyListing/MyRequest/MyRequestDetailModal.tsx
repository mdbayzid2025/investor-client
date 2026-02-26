import React from "react";

import {
  AlertCircle,
  ArrowLeft,
  DollarSign,
  Eye,
  MapPin,
  MessageSquare,
  Tag,
  Users,
  X,
} from 'lucide-react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RequestListing {
  _id: string;
  title: string;
  topic: string;
  urgency: string;
  budgetRange: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
    role: string;
    email: string;
    image?: string;
  };
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  location?: string;
  responses?: number;
  comments?: { user: string; text: string; date: string }[];
}

// ─── Urgency Config ───────────────────────────────────────────────────────────

const urgencyConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  urgent: { label: 'High Urgency', color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)' },
  high: { label: 'High Urgency', color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)' },
  medium: { label: 'Medium Urgency', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)' },
  low: { label: 'Low Urgency', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.1)' },
};

const gold = '#D4AF37';

const OwnerBadge = styled(Box)({
  backgroundColor: `${gold}15`,
  border: `1px solid ${gold}30`,
  color: gold,
  borderRadius: 8,
  padding: '8px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: '0.875rem',
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

function getRequestId(id: string): string {
  return id ? id.slice(-6).toUpperCase() : 'N/A';
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyRequestDetailModal({
  open,
  onClose,
  listing,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  listing: RequestListing | null;
  onDelete?: (id: string) => void;
}) {
  if (!open) return null;

  const requestItem = listing;

  if (!requestItem) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: 'white' }} gutterBottom>
            Request Not Found
          </Typography>
          <Link href="/dashboard/my-listings" style={{ color: gold, textDecoration: 'underline' }}>
            Return to My Listings
          </Link>
        </Box>
      </div>
    );
  }

  const urgencyKey = (requestItem.urgency ?? '').toLowerCase();
  const urgency = urgencyConfig[urgencyKey] ?? urgencyConfig.low;
  const comments = requestItem.comments ?? [];
  const responsesCount = requestItem.responses ?? comments.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-primary/20 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', pb: 10 }}>

          <Box sx={{display: "flex", justifyContent: "space-between"}}>

          {/* Owner badge */}
          <OwnerBadge sx={{ mb: 4 }}>
            <AlertCircle size={16} />
            <Typography variant="body2">
              Owner View — Only you can see full request details.
            </Typography>
          </OwnerBadge>

          <Button            
            onClick={onClose}
            sx={{ color: 'white', mb: 3, textTransform: 'none' }}
          >
            <X />
          </Button>
          </Box>
          <Grid container spacing={3}>

            {/* ── Left column ── */}
            <Grid size={{ xs: 12, lg: 8 }}>

              {/* Main card */}
              <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20`, mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ color: 'white', fontFamily: 'serif', mb: 1 }}>
                        {requestItem.title}
                      </Typography>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Tag size={14} color={gold} />
                          <Typography variant="body2" sx={{ color: 'white' }}>
                            {requestItem.topic}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          • Posted {formatDate(requestItem.createdAt)}
                        </Typography>
                      </Stack>
                    </Box>

                    <Chip
                      label={urgency.label}
                      size="small"
                      sx={{
                        bgcolor: urgency.bg,
                        color: urgency.color,
                        border: `1px solid ${urgency.color}30`,
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Budget */}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: `${gold}08`,
                      borderColor: `${gold}20`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <DollarSign size={18} color={gold} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                      Budget
                    </Typography>
                    <Typography variant="body1" sx={{ color: gold, fontFamily: 'serif', ml: 'auto' }}>
                      {requestItem.budgetRange}
                    </Typography>
                  </Paper>

                  {/* Location */}
                  {requestItem.location && (
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderColor: `${gold}15` }}
                    >
                      <MapPin size={18} color="#9ca3af" />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, mr: 1 }}>
                        Location
                      </Typography>
                      <Typography sx={{ color: 'white' }}>{requestItem.location}</Typography>
                    </Paper>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20`, mb: 3 }}>
                <CardContent>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }} gutterBottom>
                    Request Details
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', whiteSpace: 'pre-wrap' }}>
                    {requestItem.description}
                  </Typography>
                </CardContent>
              </Card>

              {/* Comments / Responses */}
              <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      Responses ({comments.length})
                    </Typography>
                    {comments.length > 0 && (
                      <Chip
                        label="Active"
                        size="small"
                        color="success"
                        variant="outlined"
                        icon={<span style={{ width: 8, height: 8, backgroundColor: '#4ade80', borderRadius: '50%' }} />}
                      />
                    )}
                  </Box>

                  {comments.length > 0 ? (
                    <Stack spacing={2}>
                      {comments.map((c: any, i: number) => (
                        <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'grey.700', width: 36, height: 36, fontSize: '0.875rem' }}>
                            {c.user.slice(0, 2).toUpperCase()}
                          </Avatar>
                          <Paper
                            sx={{
                              p: 2,
                              flex: 1,
                              bgcolor: '#0d0d0d',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{ color: c.user === 'Admin' ? gold : 'white' }}
                              >
                                {c.user}
                                {c.user === 'Admin' && (
                                  <Chip
                                    label="ADMIN"
                                    size="small"
                                    sx={{ ml: 1, height: 18, fontSize: '0.625rem', bgcolor: `${gold}20`, color: gold }}
                                  />
                                )}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                                {c.date}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                              {c.text}
                            </Typography>
                          </Paper>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }} fontStyle="italic">
                      No responses yet.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* ── Right sidebar ── */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>

                {/* Performance */}
                <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                  <CardContent>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }} gutterBottom>
                      Performance
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Eye size={16} color="#9ca3af" />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Status</Typography>
                        </Stack>
                        <Chip
                          label={requestItem.status}
                          size="small"
                          sx={{
                            bgcolor: requestItem.status === 'pending' ? 'rgba(251,191,36,0.1)' : 'rgba(74,222,128,0.1)',
                            color: requestItem.status === 'pending' ? '#fbbf24' : '#4ade80',
                            textTransform: 'capitalize',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Users size={16} color="#9ca3af" />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Responses</Typography>
                        </Stack>
                        <Typography sx={{ color: gold, fontWeight: 600 }}>{responsesCount}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MessageSquare size={16} color="#9ca3af" />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Comments</Typography>
                        </Stack>
                        <Typography sx={{ color: 'white', fontWeight: 500 }}>{comments.length}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Request Info */}
                <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                  <CardContent>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }} gutterBottom>
                      Request Info
                    </Typography>
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Request ID</Typography>
                        <Typography variant="body2" sx={{ color: 'white', fontFamily: 'monospace' }}>
                          REQ-{getRequestId(requestItem._id)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Topic</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>{requestItem.topic}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Urgency</Typography>
                        <Chip
                          label={urgency.label}
                          size="small"
                          sx={{ bgcolor: urgency.bg, color: urgency.color, borderColor: `${urgency.color}40` }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Posted by</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>
                          {requestItem.createdBy?.name ?? '—'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Role</Typography>
                        <Typography variant="body2" sx={{ color: 'white', textTransform: 'capitalize' }}>
                          {requestItem.createdBy?.role?.toLowerCase() ?? '—'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Active</Typography>
                        <Typography variant="body2" sx={{ color: requestItem.isActive ? '#4ade80' : '#f87171' }}>
                          {requestItem.isActive ? 'Yes' : 'No'}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

              </Stack>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}