from django.shortcuts import render
from django.views.generic.base import TemplateView


class SimulatorView(TemplateView):

    template_name = "base.html"

class HomePageView(TemplateView):
    
    template_name = "inicio.html"

class HelpPageView(TemplateView):
        
    template_name = "ayuda.html"

class ConfigView(TemplateView):
    
    template_name = "configuracion.html"
 
class PresentationView(TemplateView):
    
    template_name = "presentacion.html"
