

class Proceso():
	def __init__(self, id_proceso, tam, arrivo, rafaga, prio = 0):
		self.id = id_proceso
		self.tam = tam
		self.arrivo = arrivo
		self.rafaga = rafaga
		self.prio = prio

	def descontar_rafaga(self):
		self.rafaga[0] -= 1

	def eliminar_rafaga(self):
		self.rafaga.remove(self.rafaga[0])

	def tratar_proceso(self):
		self.descontar_rafaga()
		if self.rafaga[0] == 0:
			self.eliminar_rafaga()

	def proceso_terminado(self):
		if not rafaga:
			return True
		return False
