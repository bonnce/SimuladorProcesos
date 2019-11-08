# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

from . base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'simulador',
        'USER': 'snd',
        'PASSWORD': '1234',
        'HOST': 'localhost',
        'PORT': '',
    }
}