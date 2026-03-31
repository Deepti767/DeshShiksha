from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    DISABILITY_CHOICES = [
        ('deaf',      'Deaf'),
        ('blind',     'Blind'),
        ('dumb',      'Dumb (Speech Impaired)'),
        ('cognitive', 'Cognitive'),
    ]

    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name  = models.CharField(max_length=120, blank=True, default='')
    dob        = models.DateField(null=True, blank=True)
    age        = models.PositiveIntegerField(null=True, blank=True)
    disability = models.CharField(max_length=20, choices=DISABILITY_CHOICES, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} — {self.full_name} ({self.disability})"

    @property
    def display_name(self):
        return self.full_name or self.user.username


class UserProgress(models.Model):
    user              = models.OneToOneField(User, on_delete=models.CASCADE, related_name='progress')
    points            = models.IntegerField(default=0)
    lessons_completed = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} — {self.points} pts, {self.lessons_completed} lessons"
