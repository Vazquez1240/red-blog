from mongoengine import Document, StringField, DateTimeField, UUIDField, ReferenceField, IntField
from datetime import datetime

class Post(Document):
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    author_uuid = UUIDField(required=True)

    author_username = StringField(max_length=150)
    author_email = StringField()

    likes = IntField(default=0)
    comments = StringField(max_length=450, default="")

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    def __str__(self):
        return f"{self.title} by {self.author_username}"