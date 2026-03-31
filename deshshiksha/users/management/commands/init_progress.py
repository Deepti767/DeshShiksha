from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import UserProgress, UserProfile


class Command(BaseCommand):
    help = 'Create missing UserProgress and UserProfile rows for existing users'

    def handle(self, *args, **kwargs):
        for user in User.objects.all():
            _, created_p = UserProfile.objects.get_or_create(user=user)
            _, created_r = UserProgress.objects.get_or_create(user=user)
            if created_p or created_r:
                self.stdout.write(f'Fixed: {user.username}')
        self.stdout.write(self.style.SUCCESS('Done.'))
