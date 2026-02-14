import Navbar from '@/components/Navbar';
import CampaignForm from '@/components/CampaignForm';

export default function NewCampaign() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
        <CampaignForm />
      </div>
    </div>
  );
}
