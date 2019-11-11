from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [

	path('', views.PresentationView.as_view(), name="presentacion"),
	path('ajax/', views.foo, name='foo'),
	path('print/', views.preparacion, name="print"),

]