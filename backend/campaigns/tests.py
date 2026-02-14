from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Campaign
from unittest.mock import patch

class CampaignTests(APITestCase):
    def setUp(self):
        self.campaign_data = {
            'title': 'Test Campaign',
            'status': 'Active',
            'budget': '1000.00',
            'description': 'Test description'
        }
        self.url = '/api/campaigns/'

    def test_create_campaign(self):
        response = self.client.post(self.url, self.campaign_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Campaign.objects.count(), 1)
        self.assertEqual(Campaign.objects.get().title, 'Test Campaign')

    def test_list_campaigns(self):
        Campaign.objects.create(**self.campaign_data)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_stats_endpoint(self):
        Campaign.objects.create(title='C1', status='Active', budget=100)
        Campaign.objects.create(title='C2', status='Completed', budget=200)

        response = self.client.get(f'{self.url}stats/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_budget'], 300.00)
        self.assertEqual(response.data['status_counts']['Active'], 1)
        self.assertEqual(response.data['status_counts']['Completed'], 1)

    @patch('requests.get')
    def test_rates_endpoint(self, mock_get):
        mock_get.return_value.json.return_value = {'rates': {'EUR': 0.9}}
        response = self.client.get(f'{self.url}rates/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rates']['EUR'], 0.9)
