from django.test import TestCase, Client
from django.http import HttpRequest

from . import views


class SimilarityTestCase(TestCase):
    def test_similar_words(self):
        client = Client()
        response = client.post('/api/similarword/', {'words': ['test']})
        self.assertEqual(response.status_code, 200)
