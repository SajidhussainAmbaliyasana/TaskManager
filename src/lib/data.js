// Stage keys match MongoDB enum values exactly: "Todo", "In Progress", "Done"
export const STAGE_CONFIG = {
  'Todo': {
    label: 'Todo',
    color: '#94A3B8',
    bg: 'rgba(148, 163, 184, 0.12)',
    dotColor: '#64748B',
  },
  'In Progress': {
    label: 'In Progress',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.12)',
    dotColor: '#F59E0B',
  },
  'Done': {
    label: 'Done',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.12)',
    dotColor: '#10B981',
  },
};

export const STAGE_ORDER = ['Todo', 'In Progress', 'Done'];

// Priority keys match MongoDB enum values exactly: "High", "Medium", "Low"
export const PRIORITY_CONFIG = {
  High:   { label: 'High',   color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' },
  Medium: { label: 'Medium', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
  Low:    { label: 'Low',    color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' },
};

export const TAG_COLORS = {
  Design:    { color: '#818CF8', bg: 'rgba(129, 140, 248, 0.12)' },
  Backend:   { color: '#22D3EE', bg: 'rgba(34, 211, 238, 0.12)' },
  Frontend:  { color: '#34D399', bg: 'rgba(52, 211, 153, 0.12)' },
  UX:        { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.12)' },
  Research:  { color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)' },
  Billing:   { color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.12)' },
  Mobile:    { color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.12)' },
  Auth:      { color: '#F87171', bg: 'rgba(248, 113, 113, 0.12)' },
  DevOps:    { color: '#4ADE80', bg: 'rgba(74, 222, 128, 0.12)' },
  Analytics: { color: '#FB923C', bg: 'rgba(251, 146, 60, 0.12)' },
};