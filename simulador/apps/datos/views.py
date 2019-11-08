from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from .procesamiento.dispatcher import SimuladorRR, SimuladorFCFS, SimuladorRR, SimuladorPRIO
import json


def preparacion(request):
	if request.method == 'POST':
		tam_memoria = request.POST.get('tam_memoria')
		tipo_memoria = request.POST.get('tipo_memoria')
		algoritmo_memoria = request.POST.get('algoritmo_memoria')
		algoritmo_planif= request.POST.get('algoritmo_planif')
		
		context = {}

		context['tam_memoria'] = tam_memoria
		context['tipo_memoria'] = tipo_memoria
		context['algoritmo_memoria'] = algoritmo_memoria
		context['algoritmo_planif'] = algoritmo_planif

		return render(request, 'presentacion.html', context)



def foo(request):
	if request.is_ajax():
		return HttpResponse(json.dumps({'foo':'luca puto '}), content_type="application/json")

class PresentationView(TemplateView):
    
    template_name = "presentacion.html"
