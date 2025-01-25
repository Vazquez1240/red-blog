from mongoengine import( Document, StringField, DateTimeField, UUIDField, EmbeddedDocument, IntField,
                         EmbeddedDocumentField, ListField)
from datetime import datetime

class Comment(EmbeddedDocument):
    content = StringField(max_length=450, required=True)
    author_uuid = UUIDField(required=True)
    author_username = StringField(max_length=150)
    created_at = DateTimeField(default=datetime.utcnow)

class Post(Document):
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    author_uuid = UUIDField(required=True)

    author_username = StringField(max_length=150)
    author_email = StringField()

    likes = IntField(default=0)
    comments = ListField(EmbeddedDocumentField(Comment))

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    def __str__(self):
        return f"{self.title} by {self.author_username}"