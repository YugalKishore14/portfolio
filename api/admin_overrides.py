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

def send_brevo_otp(email, otp):
    """
    Sends OTP using Brevo's Transactional Email API.
    """
    api_key = os.getenv('BREVO_API_KEY')
    sender_email = os.getenv('BREVO_SENDER_EMAIL', 'aniketverma1103@gmail.com')
    
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = api_key
    
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    
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
                &copy; Aniket Verma Portfolio Admin
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
        api_response = api_instance.send_transac_email(send_smtp_email)
        return True
    except ApiException as e:
        print(f"Exception when calling TransactionalEmailsApi->send_transac_email: {e}")
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
