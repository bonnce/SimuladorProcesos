from django.db import models
from abc import ABC, abstractmethod
# Create your models here.

class DatosSimulacion(models.Model):
	tam_memoria = models.IntegerField()
	tipo_memoria = models.BooleanField()

class PresentationView(TemplateView):
    
    template_name = "presentacion.html"

def capturar_datos(request):
	pass













