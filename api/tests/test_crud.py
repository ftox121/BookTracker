from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from api.models import Book

class BookTests(APITestCase):
    
    def setUp(self):
        
        self.user = User.objects.create_user(username='testuser', password='testpassword123')
        self.token_url = reverse('get_token')
        self.book_list_url = reverse('book-list-create')
        
        response = self.client.post(self.token_url, {'username': 'testuser', 'password': 'testpassword123'}, format='json')
        self.access_token = response.data['access']
        
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    def test_create_book(self):
        data = {
            'title': 'Test Book',
            'author': 'Test Author',
            'status': 'Reading'
        }
        response = self.client.post(self.book_list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Test Book')
        self.assertEqual(response.data['author'], 'Test Author')
        self.assertEqual(response.data['status'], 'Reading')

    def test_list_books(self):
        
        Book.objects.create(title='Test Book', author='Test Author', status='Reading', user=self.user)
        
        response = self.client.get(self.book_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Book')

    def test_retrieve_book_detail(self):
        book = Book.objects.create(title='Test Book', author='Test Author', status='Reading', user=self.user)
        url = reverse('book-detail', kwargs={'pk': book.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], book.title)

    def test_update_book(self):
        book = Book.objects.create(title='Test Book', author='Test Author', status='Reading', user=self.user)
        url = reverse('book-detail', kwargs={'pk': book.pk})
        data = {
            'title': 'Updated Book',
            'author': 'Updated Author',
            'status': 'Read'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Book')

    def test_delete_book(self):
        book = Book.objects.create(title='Test Book', author='Test Author', status='Reading', user=self.user)
        url = reverse('book-detail', kwargs={'pk': book.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Book.objects.filter(pk=book.pk).exists())