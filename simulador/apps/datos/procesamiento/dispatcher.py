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

	@abstractmethod
	def ejecutar_ciclo(self):
		pass

	def get_proceso_ejecucion(self):
		return self.proceso_ejecucion

	def get_tiempo_espera(self):
		pass

	def cambio_contexto(self):
		pass




class SimuladorRR(SimuladorBase):
	QUANTUM = 3

	def __init__(self, quantum, cola_listos=None, cola_bloqueados=None, memoria_handler=None):
		super(SimuladorRR, self).__init__(cola_listos, cola_bloqueados, memoria_handler)
		SimuladorRR.QUANTUM = quantum

	def ordenar_clistos(self):
		pass

	def ejecutar_ciclo(self):
		pass

class SimuladorFCFS(SimuladorBase):
	def __init__(self, cola_listos=None, cola_bloqueados=None, memoria_handler=None):
		super(SimuladorFCFS, self).__init__(cola_listos, cola_bloqueados, memoria_handler)

	def ordenar_clistos(self):
		pass

	def ejecutar_ciclo(self):
		pass


class SimuladorPRIO(SimuladorBase):
	def __init__(self, cola_listos=None, cola_bloqueados=None, memoria_handler=None):
		super(SimuladorPRIO, self).__init__(cola_listos, cola_bloqueados, memoria_handler)

	def ordenar_clistos(self):
		self.cola.sort(key = lambda proceso: proceso.prio)

class SimuladorMLQ(SimuladorBase):
	def __init__(self, cola_listos=None, cola_bloqueados=None, memoria_handler=None):
		super(SimuladorMLQ, self).__init__(cola_listos, cola_bloqueados, memoria_handler)

	def ordenar_clistos(self, proceso):
		pass


