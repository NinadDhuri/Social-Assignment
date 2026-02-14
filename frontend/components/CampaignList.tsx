'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit } from 'lucide-react';
import api from '@/lib/api';
import { Campaign } from '@/types';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get('/campaigns/');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Failed to fetch campaigns', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      try {
        await api.delete(`/campaigns/${id}/`);
        fetchCampaigns(); // Refresh list
      } catch (error) {
        console.error('Failed to delete campaign', error);
        alert('Failed to delete campaign');
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Loading campaigns...</div>;

  if (campaigns.length === 0) {
    return <div className="p-4 text-center text-gray-500">No campaigns found. Create one to get started.</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
      <ul className="divide-y divide-gray-200">
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-lg font-medium text-indigo-600 truncate">{campaign.title}</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <Link href={`/campaigns/${campaign.id}/edit`} className="text-indigo-600 hover:text-indigo-900 flex items-center">
                    <Edit className="h-5 w-5 mr-1" /> Edit
                  </Link>
                  <button onClick={() => handleDelete(campaign.id)} className="text-red-600 hover:text-red-900 flex items-center">
                    <Trash2 className="h-5 w-5 mr-1" /> Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Budget: ${campaign.budget}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {campaign.start_date ? `Start: ${campaign.start_date}` : ''}
                    {campaign.end_date ? ` - End: ${campaign.end_date}` : ''}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
