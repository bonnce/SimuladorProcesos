from abc import ABC, abstractmethod
from . import particion

class Memoria(ABC):
	def __init__(self, particiones):
		self.particiones = particiones

	def particion_libre(self):
		for particion in self.particiones:
			if particion.proceso == None:
				return self.particiones.index(particion)
			else:
				return None

	def agregar_proceso(self, proceso):
		index = self.particion_libre()
		if index:
			self.particiones.insert(index, proceso)
			return True
		else:
			return None

	

class MemoriaFijaFirstFit(Memoria):
	def __init__(self, particiones):
		super(MemoriaFijaFirstFit, self).__init__(particiones)

class MemoriaFijaWorstFit(Memoria):
	def __init__(self, particiones):
		super(MemoriaFijaWorstFit, self).__init__(particiones)

	def particion_libre(self, proceso):
		frag_interna_global = 0
		fra_interna_local = 0
		index = None
		for particion in self.particiones:
			if particion.proceso == None and proceso.tam <= particion.tam:
				frag_interna_local = particion.frag_interna()
				if frag_interna_local < frag_interna_global:
					frag_interna_global = frag_interna_local
					index = self.particiones.index(particion)
		return index

class MemoriaVariableFirstFit(Memoria):
	def __init__(self, particiones):
		super(MemoriaVariableFirstFit, self).__init__(particiones)

	def agregar_proceso(self, proceso):
		index = self.particion_libre(proceso)
		if index:
			self.particiones.insert(index, proceso)
			if self.particiones[index].tam > proceso.tam:
				p = Particion(tam=self.particiones[index].tam - proceso.tam)
				self.particiones.insert(index+1, p)
			return True
		else:
			return None

class MemoriaVariableBestFit(MemoriaVariableFirstFit):
	def __init__(self, particiones):
		super(MemoriaVariable, self).__init__(particiones)

	def particion_libre(self, proceso):
		frag_interna_global = 0
		frag_interna_local = 0
		index = None
		for particion in self.particiones:
			if particion.proceso == None and proceso.tam <= particion.tam:
				frag_interna_local = particion.frag_interna()
				if rag_interna_local > frag_interna_global:
					frag_interna_global = frag_interna_local
					index = self.particiones.index(particion)
		return index

	




class MemoriaHandler():
	def __init__(self, memoria):
		self.memoria = memoria
		self.cola_memoria = []

	def encolar_proceso(self, proceso):
		self.cola_memoria.append(proceso)

	def add_proceso_ff(self, proceso):
		espacio_libre = self.particion_libre_ff(proceso)
		if espacio_libre: 
			self.agregar_proceso(proceso)

	def add_prcoeso(self, proceso):
		espacio_libre = self.particion_libre(proceso)
		if espacio_libre: 	
			self.agregar_proceso(proceso)


