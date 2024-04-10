import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from drf_spectacular.utils import extend_schema


from artificial_intelligence.serializers import FileSerializer
from artificial_intelligence.xray import XRay
from backend import settings

xray = XRay()

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            uploaded_file = request.data['file']

            save_path = os.path.join(settings.MEDIA_ROOT, 'uploads', uploaded_file.name)

            with open(save_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            result = xray.predict(save_path)

            response_str = f'Вероятность пневмонии: {round(100 * float(result), 2)}%'

            return Response({'prediction': response_str}, status=status.HTTP_200_OK)
