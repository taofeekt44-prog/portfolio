import logging
import resend
from django.shortcuts import render, redirect
from django.conf import settings
from .models import ContactMessage

logger = logging.getLogger(__name__)
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

            try:
                if not settings.RESEND_API_KEY:
                    raise ValueError("RESEND_API_KEY is not configured")

                resend.api_key = settings.RESEND_API_KEY

                resend.Emails.send({
                    "from": settings.RESEND_FROM_EMAIL,
                    "to": [settings.CONTACT_EMAIL],
                    "reply_to": email,
                    "subject": f"Portfolio Contact: {subject}",
                    "text": (
                        f"Name: {name}\n"
                        f"Email: {email}\n\n"
                        f"Message:\n{message}"
                    ),
                })

            except Exception:
                logger.exception(
                    "Failed to send portfolio contact email"
                )

            return redirect("/?success=1")

    success = request.GET.get("success")
    return render(
        request,
        "portfolio/index.html",
        {"success": success}
    )
