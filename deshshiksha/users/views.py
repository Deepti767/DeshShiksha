from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm, ProfileSetupForm
from .models import UserProfile, UserProgress


def get_progress(user):
    progress, _ = UserProgress.objects.get_or_create(user=user)
    return progress


# ── Register → auto-login → profile setup ────────────────────
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)           # auto-login after register
            return redirect('profile_setup')
    else:
        form = RegisterForm()
    return render(request, 'users/register.html', {'form': form})


# ── Profile setup (runs once after registration) ─────────────
@login_required
def profile_setup(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = ProfileSetupForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = ProfileSetupForm(instance=profile)
    return render(request, 'users/profile_setup.html', {'form': form})


# ── Disability selection (legacy, kept for compatibility) ─────
@login_required
def select_disability(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        disability = request.POST.get('disability')
        if disability in ['deaf', 'blind', 'dumb', 'cognitive']:
            profile.disability = disability
            profile.save()
            return redirect('dashboard')
    return render(request, 'users/select_disability.html')


# ── Main dashboard router ─────────────────────────────────────
@login_required
def dashboard(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if not profile.disability:
        return redirect('profile_setup')
    # dumb users go to cognitive dashboard for now
    target = profile.disability if profile.disability != 'dumb' else 'cognitive'
    return redirect(f'dashboard_{target}')


# ── Per-disability dashboards ─────────────────────────────────
@login_required
def dashboard_deaf(request):
    from learning.data import ALPHABETS
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'users/dashboard_deaf.html', {
        'progress': get_progress(request.user),
        'lessons':  ALPHABETS,
        'profile':  profile,
    })


@login_required
def dashboard_blind(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'users/dashboard_blind.html', {
        'progress': get_progress(request.user),
        'profile':  profile,
    })


@login_required
def dashboard_cognitive(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'users/dashboard_cognitive.html', {
        'progress': get_progress(request.user),
        'profile':  profile,
    })
