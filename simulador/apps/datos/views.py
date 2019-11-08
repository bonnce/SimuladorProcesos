from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from .procesamiento.dispatcher import SimuladorRR, SimuladorFCFS, SimuladorRR, SimuladorPRIO
import json


def preparacion(request):
	if request.method == 'POST':
		alg_planif = request.POST['alg_planif']
		alg_memoria = request.POST['alg_memoria']
		



def foo(request):
	if request.is_ajax():
		return HttpResponse(json.dumps({'foo':'luca puto '}), content_type="application/json")

class PresentationView(TemplateView):
    
    template_name = "presentacion.html"
