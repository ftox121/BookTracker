from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UserTests(APITestCase):

    def test_user_registration(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'testpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_obtain_token(self):
 
        User.objects.create_user(username='testuser', password='testpassword123')
        
        url = reverse('get_token')
        data = {
            'username': 'testuser',
            'password': 'testpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
