from abc import ABC, abstractmethod

class Dispatcher(ABC):
	def __init__(self, cola_listos, cola_bloqueados, memoria_handler):
		self.cola_listos = cola_listos
		self.cola_bloqueados = cola_bloqueados
		self.memoria_handler = memoria_handler
		self.clock = 0
		self.proceso_ejecucion = None

	@abstractmethod
	def ordenar_clistos(self):
		pass

	@abstractmethod
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




class SimuladorRR(Dispatcher):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		pass

class SimuladorFCFS(Dispatcher):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		pass

	def ejecutar_ciclo(self):
		pass


class SimuladorPRIO(Dispatcher):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self):
		self.cola.sort(key = lambda proceso: proceso.prio)

class SimuladorMLQ(Dispatcher):
	def __init__(self):
		super().__init__()

	def ordenar_clistos(self, proceso):
		pass


