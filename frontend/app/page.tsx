import Navbar from '@/components/Navbar';
import CampaignList from '@/components/CampaignList';
import DashboardCharts from '@/components/DashboardCharts';
import CurrencyWidget from '@/components/CurrencyWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-4 sm:px-0">
            <div className="md:col-span-2">
                <DashboardCharts />
            </div>
            <div>
                <CurrencyWidget />
            </div>
        </div>
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          </div>
          <CampaignList />
        </div>
      </div>
    </div>
  );
}
