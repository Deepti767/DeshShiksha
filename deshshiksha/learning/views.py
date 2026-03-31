from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from users.models import UserProgress
from .data import ALPHABETS, NUMBERS
from .gamification import after_lesson, after_quiz
import json

DISABILITY_TYPES = ['deaf', 'blind', 'cognitive']


def get_progress(user):
    progress, _ = UserProgress.objects.get_or_create(user=user)
    return progress


# --- Overview pages ---

@login_required
def deaf_alphabets(request):
    return render(request, 'learning/deaf/alphabets.html', {'lessons': ALPHABETS})

@login_required
def deaf_numbers(request):
    return render(request, 'learning/deaf/numbers.html', {'lessons': NUMBERS})

@login_required
def deaf_quiz(request):
    if request.method == 'POST':
        after_quiz(request.user)
        return redirect('dashboard_deaf')
    return render(request, 'learning/deaf/quiz.html')

@login_required
def deaf_practice(request):
    from .data import ALPHABETS, NUMBERS
    all_items = [{'key': a['letter'], 'word': a['word'], 'emoji': a['emoji'], 'type': 'alphabet'} for a in ALPHABETS]
    all_items += [{'key': n['number'], 'word': 'Number ' + n['number'], 'emoji': n['emoji'], 'type': 'number'} for n in NUMBERS]
    import json
    return render(request, 'learning/deaf/practice.html', {
        'items_json': json.dumps(all_items),
        'progress': get_progress(request.user),
    })

@login_required
def deaf_practice_award(request):
    from django.http import JsonResponse
    if request.method == 'POST':
        progress = get_progress(request.user)
        progress.points += 10
        progress.save()
        return JsonResponse({'points': progress.points})
    return JsonResponse({'error': 'POST only'}, status=405)

@login_required
def blind_alphabets(request):
    return render(request, 'learning/blind/alphabets.html', {'lessons': ALPHABETS})

@login_required
def blind_numbers(request):
    return render(request, 'learning/blind/numbers.html', {'lessons': NUMBERS})

@login_required
def blind_quiz(request):
    if request.method == 'POST':
        after_quiz(request.user)
        return redirect('dashboard_blind')
    return render(request, 'learning/blind/quiz.html')

@login_required
def cognitive_alphabets(request):
    return render(request, 'learning/cognitive/alphabets.html', {'lessons': ALPHABETS})

@login_required
def cognitive_numbers(request):
    return render(request, 'learning/cognitive/numbers.html', {'lessons': NUMBERS})

@login_required
def cognitive_quiz(request):
    if request.method == 'POST':
        after_quiz(request.user)
        return redirect('dashboard_cognitive')
    return render(request, 'learning/cognitive/quiz.html')


# --- Individual lesson pages ---

@login_required
def lesson(request, disability, module, index):
    if disability not in DISABILITY_TYPES:
        return redirect('dashboard')

    if module == 'alphabets':
        lessons = ALPHABETS
        back_url = f'/learning/{disability}/alphabets/'
    elif module == 'numbers':
        lessons = NUMBERS
        back_url = f'/learning/{disability}/numbers/'
    else:
        return redirect('dashboard')

    index = int(index)
    if index < 0 or index >= len(lessons):
        return redirect(back_url)

    # POST = user clicked Next or Finish — award points then redirect
    if request.method == 'POST':
        after_lesson(request.user)
        next_index = index + 1
        if next_index < len(lessons):
            return redirect('lesson', disability=disability, module=module, index=next_index)
        else:
            return redirect(back_url)

    # GET — render the lesson page
    item = lessons[index]
    content = item.get(disability, '')
    prev_index = index - 1 if index > 0 else None
    next_index = index + 1 if index < len(lessons) - 1 else None

    # Always use get_or_create so progress is never None
    progress = get_progress(request.user)

    context = {
        'item': item,
        'content': content,
        'disability': disability,
        'module': module,
        'index': index,
        'prev_index': prev_index,
        'next_index': next_index,
        'total': len(lessons),
        'back_url': back_url,
        'progress': progress,
        'braille_dots_json': json.dumps(item.get('braille_dots', [])),
        'lesson_word': item.get('word') or item.get('number', ''),
    }
    return render(request, 'learning/lesson.html', context)
