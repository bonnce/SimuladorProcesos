from abc import ABC, abstractmethod

class SimuladorBase(ABC):
	def __init__(self, cola_listos=None, cola_bloqueados=None, memoria_handler=None):
		self.cola_listos = cola_listos
		self.cola_bloqueados = cola_bloqueados
		self.memoria_handler = memoria_handler
		self.clock = 0
		self.proceso_ejecucion = None

	@abstractmethod
	def ordenar_clistos(self):
		pass

	
	def ejecutar_ciclo(self):
		pass

	def cargar_clistos(self, proceso):
		pass

	def get_proceso_ejecucion(self):
		return self.proceso_ejecucion

	def get_tiempo_espera(self):
		pass


	def cambio_contexto(self):
		pass




class SimuladorRR(SimuladorBase):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		pass

class SimuladorFCFS(SimuladorBase):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		pass

	def ejecutar_ciclo(self):
		pass


class SimuladorPRIO(SimuladorBase):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		self.cola.sort(key = lambda proceso: proceso.prio)

class SimuladorMLQ(SimuladorBase):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self, proceso):
		pass


