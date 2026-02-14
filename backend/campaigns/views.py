from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Sum
from .models import Campaign
from .serializers import CampaignSerializer
import requests

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-created_at')
    serializer_class = CampaignSerializer

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Returns dashboard statistics:
        - Counts by status
        - Total budget
        """
        status_counts = Campaign.objects.values('status').annotate(count=Count('status'))
        total_budget = Campaign.objects.aggregate(total=Sum('budget'))['total'] or 0

        # Format status counts
        stats_data = {item['status']: item['count'] for item in status_counts}

        return Response({
            'status_counts': stats_data,
            'total_budget': total_budget
        })

    @action(detail=False, methods=['get'])
    def rates(self, request):
        """
        Fetches currency exchange rates from open.er-api.com
        """
        try:
            response = requests.get('https://open.er-api.com/v6/latest/USD')
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
