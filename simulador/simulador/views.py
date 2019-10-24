from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
import json

class HomePageView(TemplateView):

    template_name = "base.html"

class MemoriaView(TemplateView):
    
    template_name = "memoria.html"

class ProcessView(TemplateView):
    
    template_name = "procesos.html"
 
class PresentationView(TemplateView):
    
    template_name = "presentacion.html"

def foo(request):
	if request.is_ajax():
		return HttpResponse(json.dumps({'foo':'luca puto '}), content_type="application/json")
