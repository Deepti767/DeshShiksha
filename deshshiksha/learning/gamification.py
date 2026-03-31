from users.models import UserProgress

POINTS_PER_LESSON = 10
POINTS_PER_QUIZ = 20


def after_lesson(user):
    """Award points when a lesson is completed."""
    progress, created = UserProgress.objects.get_or_create(user=user)
    progress.points += POINTS_PER_LESSON
    progress.lessons_completed += 1
    progress.save()
    print(f"[GAMIFICATION] after_lesson: user={user.username}, points={progress.points}, lessons={progress.lessons_completed}, created={created}")
    return progress


def after_quiz(user):
    """Award points when a quiz is submitted."""
    progress, created = UserProgress.objects.get_or_create(user=user)
    progress.points += POINTS_PER_QUIZ
    progress.save()
    print(f"[GAMIFICATION] after_quiz: user={user.username}, points={progress.points}, created={created}")
    return progress
