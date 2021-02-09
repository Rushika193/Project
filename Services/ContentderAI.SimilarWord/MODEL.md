# Model

Since we are using Gensim library to load the model and get similar words any Word2Vec library has to be converted to compatible KeyedVectors and remove model state values that is not needed if we don't use this model to retrain the model.

## Coverting Word2Vec Model to Gensim Compatible KeyedVector

```python
from gensim.test.utils import datapath
from gensim.models import KeyedVectors

model = KeyedVectors.load_word2vec_format("MODEL_PATH", binary=True)

model.init_sims(replace=True)

model.save('model.bin')
```