from . memoria import MemoriaHandler

class Dispatcher(ABC):
	def __init__(self):
		self.cola_listos = []
		self.cola_bloqueados = []
		self.memoria_handler = MemoriaHandler()
		self.clock = 0

	@abstractmethod
	def ordenar_clistos(self):

	def cargar_clistos(self, proceso):
		self.cola_listos.append(proceso)



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


