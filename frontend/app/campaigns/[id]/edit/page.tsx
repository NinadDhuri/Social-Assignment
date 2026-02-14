'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CampaignForm from '@/components/CampaignForm';
import api from '@/lib/api';
import { Campaign } from '@/types';

export default function EditCampaign() {
  const params = useParams();
  const id = params.id;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/campaigns/${id}/`)
        .then(response => {
          setCampaign(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch campaign', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Edit Campaign</h1>
        <CampaignForm initialData={campaign} />
      </div>
    </div>
  );
}
