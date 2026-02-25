import React, { useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  CheckCheck,
  ChevronRight,
  X as CloseIcon,
  DollarSign,
  Eye,
  MapPin,
  MessageSquare,
  Send,
  Shield,
  Tag,
  Users
} from 'lucide-react';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Link from "next/link";
import { useRouter } from "next/navigation";

// Assuming MOCK_REQUESTS is the same
// import { MOCK_REQUESTS } from '../data/mockData';

const urgencyConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  High: {
    label: 'High Urgency',
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.1)',
    dot: '#f87171',
  },
  Medium: {
    label: 'Medium Urgency',
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.1)',
    dot: '#fb923c',
  },
  Low: {
    label: 'Low Urgency',
    color: '#9ca3af',
    bg: 'rgba(156, 163, 175, 0.1)',
    dot: '#9ca3af',
  },
};

const gold = '#D4AF37';
const goldDark = '#b8962e';

const GoldChip = styled(Chip)({
  backgroundColor: `${gold}15`,
  color: gold,
  borderColor: `${gold}30`,
  '& .MuiChip-icon': { color: gold },
});

const OwnerBadge = styled(Box)({
  backgroundColor: `${gold}10`,
  border: `1px solid ${gold}30`,
  color: gold,
  borderRadius: 8,
  padding: '8px 16px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: '0.875rem',
});

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyRequestDetailModal({
  open,
  onClose,
  listing,
  onDelete,
}: any) {
 
  const router = useRouter()
  const [threadOpen, setThreadOpen] = useState(false);
  const [message, setMessage] = useState('');

  if(!open) return null
  // Replace with real data fetching in production
  const requestItem = MOCK_REQUESTS.find((item) => String(item.id) === "1");

  const [messages, setMessages] = useState([
    // same initial messages as in your code...
    { id: 1, sender: 'Seller_001', role: 'seller', text: '...', timestamp: '10:30', status: 'delivered' },
    // ... rest of messages
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: requestItem?.user || 'You',
      role: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessage('');
  };

  if (!requestItem) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="h5" color="white" gutterBottom>
          Request Not Found
        </Typography>
        <Link href="/dashboard/my-listings" style={{ color: gold, textDecoration: 'underline' }}>
          Return to My Listings
        </Link>
      </Box>
    );
  }

  const urgency = urgencyConfig[requestItem.urgency] ?? urgencyConfig.Low;
  const latestMsg = [...messages].reverse().find((m) => m.role !== 'user');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-primary/20 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto', pb: 10 }}>
          {/* Back button */}
          <Button
            startIcon={<ArrowLeft size={16} />}
            
            sx={{ color: 'text.secondary', mb: 3, textTransform: 'none' }}
          >
            Back to My Listings
          </Button>

          {/* Owner badge */}
          <OwnerBadge sx={{ mb: 4 }}>
            <AlertCircle size={16} />
            <Typography variant="body2">
              Owner View — Only you can see full request details & conversation.
            </Typography>
          </OwnerBadge>

          <Grid container spacing={3}>
            {/* Left column – main content */}
            <Grid size={{xs: 12, lg: 8}}>
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
                          <Typography variant="body2" color="text.secondary">
                            {requestItem.topic}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          • Posted {requestItem.date}
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
                        '&::before': {
                          content: '""',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: urgency.color,
                          mr: 1,
                        },
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
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                      Budget
                    </Typography>
                    <Typography variant="body1" sx={{ color: gold, fontFamily: 'serif', ml: 'auto' }}>
                      {requestItem.budget}
                    </Typography>
                  </Paper>

                  {/* Location */}
                  {requestItem.location && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        borderColor: `${gold}15`,
                      }}
                    >
                      <MapPin size={18} color="text.secondary" />
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mr: 1 }}>
                        Location
                      </Typography>
                      <Typography color="text.primary">{requestItem.location}</Typography>
                    </Paper>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20`, mb: 3 }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary" gutterBottom>
                    Request Details
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {requestItem.content}
                  </Typography>
                </CardContent>
              </Card>

              {/* Responses */}
              <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="overline" color="text.secondary">
                      Responses ({requestItem.comments?.length ?? 0})
                    </Typography>
                    {requestItem.comments?.length > 0 && (
                      <Chip
                        label="Active"
                        size="small"
                        color="success"
                        variant="outlined"
                        icon={<span style={{ width: 8, height: 8, backgroundColor: '#4ade80', borderRadius: '50%' }} />}
                      />
                    )}
                  </Box>

                  {requestItem.comments?.length > 0 ? (
                    <Stack spacing={2}>
                      {requestItem.comments.map((c: any, i: number) => (
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
                                sx={{ color: c.user === 'Admin' ? gold : 'text.primary' }}
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
                              <Typography variant="caption" color="text.secondary">
                                {c.date}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {c.text}
                            </Typography>
                          </Paper>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                      No responses yet.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right sidebar */}
            <Grid size={{xs: 12, lg:4}}>
              <Stack spacing={3}>
                {/* Stats */}
                <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary" gutterBottom>
                      Performance
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Eye size={16} />
                          <Typography variant="body2" color="text.secondary">
                            Views
                          </Typography>
                        </Stack>
                        <Typography fontWeight="medium">
                          {requestItem.id === 1 ? 24 : requestItem.id === 2 ? 18 : 45}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Users size={16} />
                          <Typography variant="body2" color="text.secondary">
                            Responses
                          </Typography>
                        </Stack>
                        <Typography color={gold} fontWeight="medium">
                          {requestItem.responses}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MessageSquare size={16} />
                          <Typography variant="body2" color="text.secondary">
                            Messages
                          </Typography>
                        </Stack>
                        <Typography fontWeight="medium">{messages.length}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Request Info */}
                <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}20` }}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary" gutterBottom>
                      Request Info
                    </Typography>
                    <Stack spacing={1.5} sx={{ fontSize: '0.875rem' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Request ID</Typography>
                        <Typography fontFamily="monospace">REQ-00{requestItem.id}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Topic</Typography>
                        <Typography>{requestItem.topic}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography color="text.secondary">Urgency</Typography>
                        <Chip
                          label={requestItem.urgency}
                          size="small"
                          sx={{
                            bgcolor: urgency.bg,
                            color: urgency.color,
                            borderColor: `${urgency.color}40`,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">Posted by</Typography>
                        <Typography>{requestItem.user}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Open Thread Button */}
                <Card sx={{ bgcolor: '#111', border: `1px solid ${gold}30` }}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary" gutterBottom>
                      Conversation Thread
                    </Typography>

                    {latestMsg && (
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          bgcolor: '#0d0d0d',
                          borderColor: 'rgba(255,255,255,0.08)',
                          mb: 2,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" gutterBottom>
                          {latestMsg.sender} · {latestMsg.timestamp}
                        </Typography>
                        <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {latestMsg.text}
                        </Typography>
                      </Paper>
                    )}

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: gold,
                        color: 'black',
                        '&:hover': { bgcolor: '#F4CF57' },
                        py: 1.5,
                      }}
                      endIcon={<ChevronRight />}
                      onClick={() => setThreadOpen(true)}
                    >
                      Open Thread ({messages.length} msgs)
                    </Button>

                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                      <Shield size={14} color={gold} />
                      <Typography variant="caption" color="text.secondary">
                        End-to-end monitored · No contact info allowed
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          {/* ── Thread Drawer ── */}
          <Drawer
            anchor="right"
            open={threadOpen}
            onClose={() => setThreadOpen(false)}
            PaperProps={{
              sx: {
                width: { xs: '100%', sm: 480 },
                bgcolor: '#0a0a0a',
                borderLeft: `1px solid ${gold}20`,
              },
            }}
          >
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: `1px solid ${gold}20`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" sx={{ color: 'white', fontFamily: 'serif' }}>
                  {requestItem.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {messages.length} messages · Active
                </Typography>
              </Box>
              <IconButton onClick={() => setThreadOpen(false)} sx={{ color: 'text.secondary' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Admin notice */}
            <Alert
              severity="info"
              icon={<Shield size={18} />}
              sx={{
                m: 2,
                bgcolor: `${gold}08`,
                border: `1px solid ${gold}20`,
                color: 'text.primary',
                '& .MuiAlert-icon': { color: gold },
              }}
            >
              All messages monitored. No personal contact details allowed.
            </Alert>

            {/* Messages list */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              <Stack spacing={3}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                      sx={{ mb: 0.5 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            msg.role === 'admin'
                              ? gold
                              : msg.role === 'user'
                                ? 'primary.light'
                                : 'text.secondary',
                          fontWeight: msg.role === 'admin' ? 600 : 500,
                        }}
                      >
                        {msg.role === 'user' ? 'You' : msg.sender}
                        {msg.role === 'admin' && (
                          <Chip
                            label="ADMIN"
                            size="small"
                            sx={{ ml: 1, height: 18, fontSize: '0.625rem', bgcolor: `${gold}20`, color: gold }}
                          />
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {msg.timestamp}
                      </Typography>
                    </Stack>

                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor:
                          msg.role === 'admin'
                            ? `${gold}10`
                            : msg.role === 'user'
                              ? 'primary.dark'
                              : '#1a1a1a',
                        border:
                          msg.role === 'admin'
                            ? `1px solid ${gold}20`
                            : msg.role === 'user'
                              ? '1px solid rgba(59,130,246,0.3)'
                              : '1px solid rgba(255,255,255,0.08)',
                        color: msg.role === 'user' ? 'white' : 'text.primary',
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>

                      {msg.role === 'user' && (
                        <Box sx={{ textAlign: 'right', mt: 0.5 }}>
                          <CheckCheck
                            size={14}
                            color={msg.status === 'delivered' ? '#60a5fa' : 'text.disabled'}
                          />
                        </Box>
                      )}
                    </Paper>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Message input */}
            <Box sx={{ p: 2, borderTop: `1px solid ${gold}15` }}>
              <form onSubmit={handleSend}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message…"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        type="submit"
                        disabled={!message.trim()}
                        sx={{
                          bgcolor: gold,
                          color: 'black',
                          '&:hover': { bgcolor: '#F4CF57' },
                          '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
                        }}
                      >
                        <Send size={18} />
                      </IconButton>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#111',
                      borderRadius: 3,
                      '& fieldset': { borderColor: `${gold}30` },
                      '&:hover fieldset': { borderColor: `${gold}60` },
                      '&.Mui-focused fieldset': { borderColor: gold },
                    },
                  }}
                />
              </form>
            </Box>
          </Drawer>
        </Box>

      </div>
    </div>
  );
}


const MOCK_REQUESTS = [
  {
    id: 1,
    user: 'Investor042',
    topic: 'Vacant Land',
    title: 'Coastal Development Land Needed',
    content: 'Looking for 50+ hectares near coastal region for luxury development. Budget open. Ideally looking for land with existing zoning rights or potential for rezoning. Access to main roads is crucial.',
    budget: '$2M - $5M',
    location: 'Coastal Region, Western Cape',
    urgency: 'High',
    date: '2 hours ago',
    responses: 3,
    comments: [
      { user: 'Agent007', text: 'I have a listing that matches this description near Mossel Bay.', date: '1 hour ago' },
      { user: 'Investor042', text: 'Please send teaser details.', date: '45 mins ago' },
      { user: 'Admin', text: 'Reminder: Share details via the secure portal only.', date: '30 mins ago' }
    ]
  },
  {
    id: 2,
    user: 'Developer009',
    topic: 'Hotels',
    title: 'Distressed Hotel Assets',
    content: 'Seeking boutique hotel opportunities in Cape Town CBD. Distressed assets considered. We are looking for properties that can be turned around with renovation and rebranding.',
    budget: '$10M - $15M',
    location: 'Cape Town CBD',
    urgency: 'Medium',
    date: '5 hours ago',
    responses: 1,
    comments: [
      { user: 'Seller88', text: 'We are privately selling a 4-star hotel in the city bowl.', date: '3 hours ago' }
    ]
  },
  {
    id: 3,
    user: 'Investor101',
    topic: 'Farms',
    title: 'Macadamia Farm',
    content: 'Macadamia farm with existing infrastructure required. Mpumalanga region preferred. Must have water rights and established orchards (5+ years).',
    budget: '$5M - $8M',
    location: 'Mpumalanga',
    urgency: 'Low',
    date: '1 day ago',
    responses: 8,
    comments: []
  }
];