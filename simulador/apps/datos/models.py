from django.db import models
from abc import ABC, abstractmethod
# Create your models here.

class DatosSimulacion(models.Model):
	tam_memoria = models.IntegerField()
	tipo_memoria = models.BooleanField()














