from mongoengine import Document, StringField, DateTimeField, UUIDField
from datetime import datetime
from users.models import User

class Post(Document):
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    # Guardamos el UUID del usuario en lugar de una referencia directa
    author_uuid = UUIDField(required=True)
    # Campos opcionales para cache de datos del autor
    author_username = StringField(max_length=150)
    author_email = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'posts',
        'indexes': [
            'author_uuid',  # Indexamos el UUID para búsquedas rápidas
            ('author_uuid', 'created_at')
        ]
    }

    def __str__(self):
        return f"{self.title} by {self.author_username}"

    @classmethod
    def create_post(cls, title, content, user):
        """
        Método de ayuda para crear posts incluyendo la información del autor
        """
        return cls(
            title=title,
            content=content,
            author_uuid=user.uuid,
            author_username=user.username,
            author_email=user.email
        ).save()

    def get_author(self):
        """
        Método para obtener el autor del post desde la base de datos SQL
        """
        return User.objects.get(uuid=self.author_uuid)