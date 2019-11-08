

class Memoria(ABC):
	def __init__(self, particiones):
		self.particiones = particiones

	def particion_libre_ff(self):
		for particion in self.particiones:
			if particion.proceso == None:
				return self.particiones.index(particion)
			else:
				return None

	@abstractmethod
	def particion_libre(self, proceso):


	def agregar_proceso(self, proceso):
		index = self.particion_libre_ff()
		if index:
			self.particiones.insert(index, proceso)
		else:
			return None

class MemoriaFija(Memoria):
	def __init__(self):
		super().__init__()

	def particion_libre(self, proceso):
		frag_interna_global = 0
		fra_interna_local = 0
		index = None
		for particion in self.particiones:
			if particion.proceso == None && proceso.tam <= particion.tam:
				frag_interna_local = particion.frag_interna()
				if frag_interna_local < frag_interna_global:
					frag_interna_global = frag_interna_local
					index = self.particiones.index(particion)
		return index

	def agregar_proceso(self, proceso):
		index = self.particion_libre(proceso)
		if index:
			self.particiones.insert(index, proceso)
		else:
			return None
			

class MemoriaVariable(Memoria):
	def __init__(self):
		super().__init__()

	def particion_libre(self, proceso):
		frag_interna_global = 0
		frag_interna_local = 0
		index = None
		for particion in self.particiones:
			if particion.proceso == None && proceso.tam <= particion.tam:
				frag_interna_local = particion.frag_interna()
				if rag_interna_local > frag_interna_global:
					frag_interna_global = frag_interna_local
					index = self.particiones.index(particion)
		return index

	def agregar_proceso(self, proceso):
		index = self.particion_libre(proceso)
		if index:
			self.particiones.insert(index)
		else:
			return None




class MemoriaHandler():
	def __init__(self):
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

	def quitar_proceso(self, proceso):
		self.memoria.particiones.remove(proceso)
		