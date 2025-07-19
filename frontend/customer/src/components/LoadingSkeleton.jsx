// src/components/LoadingSkeleton.jsx
import { Skeleton } from '@mui/material'

export const ProfileSkeleton = () => (
  <Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
      <Skeleton variant="text" width={200} height={40} />
    </Box>
    <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={56} />
  </Box>
)