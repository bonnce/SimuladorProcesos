

class Cola():
	def __init__(self):
		self.cola = []

	def acum_tiempo(self):
		tiempo_espera = 0
		for proceso in self.cola:
			tiempo_espera += proceso.get_tiempo()
		return tiempo_espera / len(self.cola)

class ColaListos(Cola):
	def __init__(self):
		self.tiempo_espera = 0

	def get_tiempo_espera(self):
		self.tiempo_espera = self.acum_tiempo()
		return self.tiempo_espera


class ColaBLoqueados(Cola):
	def __init__(self):
		self.tiempo_respuesta = 0

	def get_tiempo_respuesta(self):
		self.tiempo_respuesta = self.acum_tiempo()
		return self.tiempo_respuesta
