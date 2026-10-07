from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage

# Create your views here.
def home(request):

    if request.method == "POST":

        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        subject = request.POST.get("subject", "").strip()
        message = request.POST.get("message", "").strip()

        if name and email and subject and message:

            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )

            send_mail(
                subject=f"Portfolio Contact: {subject}",
                message=(
                    f"Name: {name}\n"
                    f"Email: {email}\n\n"
                    f"Message:\n{message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )

            return redirect("/?success=1")

    success = request.GET.get("success")
    return render(request,"portfolio/index.html",{"success": success})