from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
import json

def foo(request):
	if request.is_ajax():
		return HttpResponse(json.dumps({'foo':'luca puto '}), content_type="application/json")

class PresentationView(TemplateView):
    
    template_name = "presentacion.html"
