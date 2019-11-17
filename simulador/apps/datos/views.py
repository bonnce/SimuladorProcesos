from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from .procesamiento.dispatcher import SimuladorRR, SimuladorFCFS, SimuladorRR, SimuladorPRIO, SimuladorMLQ
from .procesamiento.memoria import MemoriaFija, MemoriaVariable, MemoriaHandler
import json


class Foo():
	def __init__(self, foo):
		self.foo = foo

	def get_foo(self):
		return self.foo

def setSimulador(cola_listos, cola_bloqueados, tipo_memoria, algoritmo_planif):
	simulador, memoria = inicializar_entidades(tipo_memoria, algoritmo_planif)
	memoria_handler = MemoriaHandler(memoria)
	simulador.memoria_handler = memoria_handler
	simulador.cola_listos = cola_listos
	simulador.cola_bloqueados = cola_bloqueados

def inicializar_entidades(tipo_memoria, algoritmo_planif):

	particiones = []
	if tipo_memoria == 'Fija':
		memoria = MemoriaFija(particiones)
	else:
		memoria = MemoriaVariable(particiones)

	if algoritmo_planif == 'FCFS':
		simulador = SimuladorFCFS()
	elif algoritmo_planif == 'Prioridades':
		simulador = SimuladorPRIO
	elif algoritmo_planif == 'Multinivel Sin Retro':
		simulador = SimuladorMLQ()
	else:
		simulador = SimuladorRR()

	return simulador, memoria

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

		cola_listos = []
		cola_bloqueados = []

		setSimulador(cola_listos, cola_bloqueados, tipo_memoria, algoritmo_planif)
		
		return render(request, 'presentacion.html', context)



def foo(request):
	if request.is_ajax():
		return HttpResponse(json.dumps({'foo':'luca puto '}), content_type="application/json")

class PresentationView(TemplateView):
	
	template_name = "presentacion.html"
