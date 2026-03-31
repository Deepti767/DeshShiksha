import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from .rules import get_response


@login_required
def chatbot_page(request):
    return render(request, 'chatbot/chatbot.html')


@login_required
@require_POST
def chatbot_api(request):
    try:
        data = json.loads(request.body)
        message = data.get('message', '').strip()
        if not message:
            return JsonResponse({'error': 'Empty message'}, status=400)
        response = get_response(message)
        return JsonResponse({'reply': response['text'], 'link': response['link']})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
