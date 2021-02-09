from django.apps import AppConfig
from gensim.models import KeyedVectors
from decouple import config

# Load Word2Vec model generated using gensim library
MODEL = KeyedVectors.load(
    config('MODEL_LOCATION'), mmap='r')

# Load other binary Word2Vec model
# MODEL = KeyedVectors.load_word2vec_format(
#     config('MODEL_LOCATION'), binary=True)

MODEL_STATUS = 0


class ApiConfig(AppConfig):
    name = 'api'
