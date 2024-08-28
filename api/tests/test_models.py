from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Book


class BookModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.book = Book.objects.create(
            title = 'Test Book',
            author = 'Author Name',
            status = 'Want to Read',
            user = self.user
        )
    
    def test_book_creation(self):
        self.assertEqual(self.book.title, 'Test Book')
        self.assertEqual(self.book.author, 'Author Name')
        self.assertEqual(self.book.status, 'Want to Read')
        self.assertEqual(self.book.user.username, 'testuser')