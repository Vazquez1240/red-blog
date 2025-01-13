from django.db import models
from users.models import  User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name="user"
    )
    bio = models.TextField(blank=True, null=True, verbose_name="Biografía")
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True, verbose_name="Foto de perfil")
    location = models.CharField(max_length=255, blank=True, null=True, verbose_name="Ubicación")
    website = models.URLField(blank=True, null=True, verbose_name="Sitio web")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Perfil de {self.user.email}"

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Follow(models.Model):
    follower = models.ForeignKey(Profile, related_name="followers", on_delete=models.CASCADE)
    following = models.ForeignKey(Profile, related_name="following", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following')
