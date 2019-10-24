
class Particion():
	def __init__(self, tam, proceso = None):
		self.tam = tam
		self.proceso = proceso

	def frag_interna(self):
		if self.proceso:
			return self.tam - self.proceso.tam
		else:
			return self.tam
