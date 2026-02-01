"""
Script to create/update the admin interface theme to match the portfolio website.
Run with: python setup_admin_theme.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from admin_interface.models import Theme

# Portfolio color palette
COLORS = {
    # Dark backgrounds
    'bg_primary': '#020617',      # slate-950
    'bg_secondary': '#0f172a',    # slate-900
    'bg_card': '#1e293b',         # slate-800
    'bg_hover': '#334155',        # slate-700
    
    # Cyan accents
    'cyan_primary': '#22d3ee',    # cyan-400
    'cyan_secondary': '#06b6d4',  # cyan-500
    'cyan_dark': '#0891b2',       # cyan-600
    
    # Text colors
    'text_primary': '#e2e8f0',    # slate-200
    'text_secondary': '#94a3b8',  # slate-400
    
    # Other
    'success': '#10b981',         # emerald-500
    'danger': '#ef4444',          # red-500
    'warning': '#f59e0b',         # amber-500
}

def setup_theme():
    # Get or create the active theme
    theme, created = Theme.objects.get_or_create(
        name='AV.hq',
        defaults={'active': True}
    )
    
    if not created:
        print("Updating existing AV.hq theme...")
    else:
        print("Creating new AV.hq theme...")
    
    # Deactivate all other themes
    Theme.objects.exclude(pk=theme.pk).update(active=False)
    
    # Set theme as active
    theme.active = True
    
    # Title and branding
    theme.title = "AV.hq Admin"
    theme.title_visible = True
    
    # Header colors (top bar)
    theme.css_header_background_color = COLORS['bg_secondary']
    theme.css_header_text_color = COLORS['cyan_primary']
    theme.css_header_link_color = COLORS['cyan_primary']
    theme.css_header_link_hover_color = COLORS['text_primary']
    
    # Module header colors (section headers in admin)
    theme.css_module_background_color = COLORS['bg_card']
    theme.css_module_text_color = COLORS['cyan_primary']
    theme.css_module_link_color = COLORS['cyan_primary']
    theme.css_module_link_hover_color = COLORS['text_primary']
    theme.css_module_rounded_corners = True
    
    # Module selected (active) colors
    theme.css_module_selected_background_color = COLORS['cyan_dark']
    theme.css_module_selected_text_color = COLORS['bg_primary']
    
    # Generic link colors
    theme.css_generic_link_color = COLORS['cyan_primary']
    theme.css_generic_link_hover_color = COLORS['cyan_secondary']
    theme.css_generic_link_active_color = COLORS['text_primary']
    
    # Save button colors
    theme.css_save_button_background_color = COLORS['cyan_primary']
    theme.css_save_button_background_hover_color = COLORS['cyan_secondary']
    theme.css_save_button_text_color = COLORS['bg_primary']
    
    # Delete button colors
    theme.css_delete_button_background_color = COLORS['danger']
    theme.css_delete_button_background_hover_color = '#dc2626'
    theme.css_delete_button_text_color = COLORS['text_primary']
    
    # Related modal settings
    theme.related_modal_active = True
    theme.related_modal_background_color = COLORS['bg_primary']
    theme.related_modal_background_opacity = '0.8'
    theme.related_modal_rounded_corners = True
    theme.related_modal_close_button_visible = True
    
    # List filter settings
    theme.list_filter_dropdown = True
    theme.list_filter_sticky = True
    theme.list_filter_highlight = True
    theme.list_filter_removal_links = True
    
    # Form settings
    theme.form_pagination_sticky = True
    theme.form_submit_sticky = True
    theme.show_fieldsets_as_tabs = False
    theme.show_inlines_as_tabs = False
    
    # Collapsible settings
    theme.collapsible_stacked_inlines = True
    theme.collapsible_tabular_inlines = True
    theme.foldable_apps = True
    
    # Recent actions
    theme.recent_actions_visible = True
    
    # Language chooser
    theme.language_chooser_active = False
    
    # Save the theme
    theme.save()
    
    print(f"✅ Theme '{theme.name}' configured successfully!")
    print(f"   - Header: {COLORS['bg_secondary']} with {COLORS['cyan_primary']} text")
    print(f"   - Modules: {COLORS['bg_card']} with {COLORS['cyan_primary']} headers")
    print(f"   - Links: {COLORS['cyan_primary']}")
    print(f"   - Buttons: {COLORS['cyan_primary']} background")
    print("")
    print("🎨 Restart your Django server to see the changes!")

if __name__ == '__main__':
    setup_theme()
