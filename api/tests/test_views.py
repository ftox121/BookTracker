from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from api.models import Book
from django.urls import reverse


class BookViewTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.book = Book.objects.create(
            title='Test Book',
            author='Author Name',
            status='Want to Read',
            user=self.user
        )
    
    def test_get_books(self):
        response = self.client.get(reverse('book-list-create'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Book')

    def test_create_book(self):
        data = {
            'title': 'New Book',
            'author': 'New Author',
            'status': 'Reading',
        }
        response = self.client.post(reverse('book-list-create'), data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Book.objects.count(), 2)
        self.assertEqual(Book.objects.last().title, 'New Book')