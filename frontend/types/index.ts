export type CampaignStatus = 'Draft' | 'Active' | 'Completed' | 'Paused';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  status: CampaignStatus;
  budget: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  status_counts: Record<string, number>;
  total_budget: number;
}
