import time

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.apps import MODEL, MODEL_STATUS

# MODEL STATUS
# 0 - Model not loaded
# 1 - Model loading in progress
# 2 - Model already loaded in memory


@api_view(["POST"])
def similar(request):
    global MODEL_STATUS
    if MODEL_STATUS == 0:
        MODEL_STATUS = 1
        return get_similar(request)
    elif MODEL_STATUS == 1:
        loopCount = 1
        while loopCount < 30:
            time.sleep(1)
            if MODEL_STATUS == 2:
                return get_similar(request)
            loopCount = loopCount + 1
    elif MODEL_STATUS == 2:
        return get_similar(request)


def get_similar(request):
    try:
        returnList = []
        words = request.data.get('words')
        for word in words:
            try:
                similar = MODEL.most_similar(word)
                for s in similar:
                    returnList.append(s[0].replace('_', ' ').lower())
            except:
                returnList.append(word)
            global MODEL_STATUS
            MODEL_STATUS = 2
        return JsonResponse(returnList, safe=False)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
