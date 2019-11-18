from abc import ABC, abstractmethod
from . import particion

class AbstractBaseMemory(ABC):
	def __init__(self, particiones):
		self.particiones = particiones

	def particion_libre(self, proceso):
		for particion in self.particiones:
			if particion.proceso == None and particion.tam <= proceso.tam:
				return self.particiones.index(particion)
			else:
				return None

	def quitar_proceso(self, proceso):
		for particion in self.particiones:
			if particion.proceso == proceso:
				particion.proceso = None

	@abstractmethod
	def agregar_proceso(self, proceso):
		pass
		

class MemoriaFijaFirstFit(AbstractBaseMemory):
	def __init__(self, particiones):
		super(MemoriaFijaFirstFit, self).__init__(particiones)

	def agregar_proceso(self, proceso, index):
		self.particiones.insert(index, proceso)

class MemoriaFijaWorstFit(MemoriaFijaFirstFit):
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

class MemoriaVariableFirstFit(AbstractBaseMemory):
	def __init__(self, particiones):
		super(MemoriaVariableFirstFit, self).__init__(particiones)

	def agregar_proceso(self, proceso, index):
		self.particiones.insert(index, proceso)
		if self.particiones[index].tam > proceso.tam:
			p = Particion(tam=self.particiones[index].tam - proceso.tam)
			self.particiones.insert(index+1, p)

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

	def insertar_proceso(self):
		if self.cola_memoria != None:
			proceso = self.cola_memoria[0]
			particion_libre = self.memoria.particion_libre(proceso)
			if particion_libre:
				self.memoria.agregar_proceso(proceso=proceso, index=particion_libre)
				return True
		return False


