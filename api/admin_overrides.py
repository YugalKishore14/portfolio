import os
import random
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
from django.conf import settings
from .models import AdminOTP
from django.contrib.admin.sites import AdminSite
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def _get_brevo_client():
    api_key = os.getenv('BREVO_API_KEY')
    if not api_key:
        print(f"BREVO_API_KEY not found in environment")
        return None
    
    # Debug logging
    print(f"✓ Brevo API Key loaded (length: {len(api_key)})")
    print(f"✓ Key preview: {api_key[:15]}...{api_key[-10:]}")
    
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = api_key
    return sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

def send_brevo_otp(email, otp):
    """
    Sends OTP using Brevo's Transactional Email API.
    """
    api_instance = _get_brevo_client()
    if not api_instance:
        return False

    sender_email = os.getenv('BREVO_SENDER_EMAIL', 'yugalkishore14@gmail.com')
    subject = "Admin Login OTP"
    html_content = f"""
    <html>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #417690; text-align: center;">Security Verification</h2>
            <p>Hello Admin,</p>
            <p>Your verification code for the portfolio admin panel is:</p>
            <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 2em; letter-spacing: 5px; font-weight: bold; color: #333;">
                {otp}
            </div>
            <p style="color: #666; font-size: 0.9em; margin-top: 20px;">
                This code will expire in 5 minutes. If you did not request this login, please change your password immediately.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="text-align: center; color: #999; font-size: 0.8em;">
                &copy; Yugal Kishor Portfolio Admin
            </p>
        </div>
    </body>
    </html>
    """
    
    sender = { "name": "Portfolio Admin", "email": sender_email }
    to = [{"email": email}]
    
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to,
        html_content=html_content,
        sender=sender,
        subject=subject
    )
    
    try:
        api_instance.send_transac_email(send_smtp_email)
        return True
    except ApiException as e:
        print(f"Exception when calling TransactionalEmailsApi->send_transac_email: {e}")
        return False

def send_brevo_query_emails(query, admin_email):
    """
    Sends service query emails using Brevo (one to admin, one to requester).
    """
    api_instance = _get_brevo_client()
    if not api_instance:
        return False

    sender_email = os.getenv('BREVO_SENDER_EMAIL', 'yugalkishore14@gmail.com')
    sender = { "name": "Portfolio System", "email": sender_email }

    # 1. Send to Admin
    admin_html = f"""
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #06b6d4;">New Product Query Received</h2>
        <p><strong>Name:</strong> {query.name}</p>
        <p><strong>Email:</strong> {query.email}</p>
        <p><strong>Subject:</strong> {query.subject}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">{query.message}</p>
    </div>
    """
    
    admin_email_smtp = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": admin_email}],
        html_content=admin_html,
        sender=sender,
        subject=f"New Product Query: {query.subject}"
    )

    # 2. Send to Requester
    user_html = f"""
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #06b6d4;">Transmission Received</h2>
        <p>Hello {query.name},</p>
        <p>Thank you for reaching out. I have received your query regarding <strong>'{query.subject}'</strong> and will get back to you shortly.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <p style="color: #666; font-style: italic;">{query.message}</p>
        <p style="margin-top: 20px;">Best regards,<br/>Yugal Kishor</p>
    </div>
    """
    
    user_email_smtp = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": query.email}],
        html_content=user_html,
        sender=sender,
        subject=f"Confirmation: Query Received - {query.subject}"
    )

    try:
        # Both returns are ignored or handled together
        api_instance.send_transac_email(admin_email_smtp)
        api_instance.send_transac_email(user_email_smtp)
        return True
    except ApiException as e:
        print(f"Brevo API error: {e}")
        return False


def send_valentine_message_email(message, location, device, timestamp):
    """
    Sends Valentine message to admin via Brevo.
    """
    api_instance = _get_brevo_client()
    if not api_instance:
        return False

    sender_email = os.getenv('BREVO_SENDER_EMAIL', 'yugalkishore14@gmail.com')
    sender = { "name": "Valentine's Day 💖", "email": sender_email }

    # Send to Admin
    admin_html = f"""
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 30px; background: linear-gradient(135deg, #FFE5EC 0%, #FFF0F3 100%); border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #FF4D6D; font-size: 2.5em; margin: 0;">💖 Valentine Message 💖</h1>
            <p style="color: #590D22; font-size: 1.1em; margin-top: 10px;">You've received a special message!</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 10px 30px rgba(255, 77, 109, 0.2);">
            <div style="border-left: 4px solid #FF4D6D; padding-left: 15px; margin-bottom: 20px;">
                <h3 style="color: #FF4D6D; margin: 0 0 10px 0;">💌 Message:</h3>
                <p style="font-size: 1.1em; color: #590D22; white-space: pre-wrap; line-height: 1.6;">{message}</p>
            </div>
            
            <hr style="border: none; border-top: 2px solid #FFB3C1; margin: 25px 0;">
            
            <div style="color: #666; font-size: 0.9em;">
                <p style="margin: 8px 0;"><strong>📍 Location:</strong> {location}</p>
                <p style="margin: 8px 0;"><strong>📱 Device:</strong> {device}</p>
                <p style="margin: 8px 0;"><strong>🕐 Time:</strong> {timestamp.strftime('%B %d, %Y at %I:%M %p')}</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #FFB3C1;">
            <p style="color: #999; font-size: 0.85em;">
                ❤️ Happy Valentine's Day! ❤️
            </p>
        </div>
    </div>
    """
    
    admin_email_smtp = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": "yugalkishore14@gmail.com"}],
        html_content=admin_html,
        sender=sender,
        subject="💖 New Valentine's Day Message!"
    )

    try:
        api_instance.send_transac_email(admin_email_smtp)
        return True
    except ApiException as e:
        print(f"Brevo API error: {e}")
        return False

def otp_admin_login(self, request, extra_context=None):
    """
    Overridden login view for the admin site to support MFA via Brevo.
    """
    if request.method == 'POST':
        if 'otp' in request.POST:
            # Step 2: Verify OTP
            user_id = request.session.get('otp_user_id')
            if user_id:
                from django.contrib.auth.models import User
                try:
                    user = User.objects.get(id=user_id)
                    otp_obj = AdminOTP.objects.filter(user=user).first()
                    submitted_otp = request.POST.get('otp')
                    
                    if otp_obj and otp_obj.is_valid() and otp_obj.otp == submitted_otp:
                        auth_login(request, user)
                        del request.session['otp_user_id']
                        # Clear OTP after use
                        otp_obj.otp = ''
                        otp_obj.save()
                        return redirect(request.GET.get('next', 'admin:index'))
                    else:
                        messages.error(request, "Invalid or expired OTP. Please try again.")
                        return render(request, 'admin/otp_verify.html', {'user': user, 'title': 'Verify OTP', 'app_path': request.get_full_path()})
                except User.DoesNotExist:
                    messages.error(request, "User session lost. Please login again.")
            else:
                messages.error(request, "Session expired. Please login again.")
        else:
            # Step 1: Initial Login
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(username=username, password=password)
            
            if user is not None and user.is_staff:
                if not user.email:
                    messages.error(request, "Admin user does not have an email address configured. Cannot send OTP.")
                    return AdminSite.login(self, request, extra_context)
                
                # Generate OTP
                otp_obj, created = AdminOTP.objects.get_or_create(user=user)
                otp = str(random.randint(100000, 999999))
                otp_obj.otp = otp
                otp_obj.save()
                
                # Send email using Brevo
                if send_brevo_otp(user.email, otp):
                    request.session['otp_user_id'] = user.id
                    return render(request, 'admin/otp_verify.html', {
                        'user': user,
                        'title': 'Verify OTP',
                        'app_path': request.get_full_path(),
                    })
                else:
                    messages.error(request, "Failed to send verification email via Brevo. Please check logs.")
                    return AdminSite.login(self, request, extra_context)
    
    return AdminSite.login(self, request, extra_context)
