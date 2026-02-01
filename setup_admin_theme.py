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

# Refined color palette - professional and readable
COLORS = {
    # Dark backgrounds
    'header_bg': '#1a2332',         # Dark blue-gray header
    'module_bg': '#2d3748',         # Slightly lighter for modules
    
    # Text colors - high contrast for readability
    'header_text': '#ffffff',       # White for header
    'module_text': '#ffffff',       # White for module headers
    'body_text': '#e2e8f0',         # Light gray for body
    
    # Accent colors - used sparingly
    'link_color': '#2d3748',        # Teal/cyan for links
    'link_hover': '#2d3748',        # Lighter teal on hover
    
    # Button colors - professional look
    'save_btn_bg': '#38a169',       # Green for save (success color)
    'save_btn_hover': '#2f855a',    # Darker green on hover
    'save_btn_text': '#ffffff',     # White text
    
    'delete_btn_bg': '#e53e3e',     # Red for delete
    'delete_btn_hover': '#c53030',  # Darker red on hover
    
    # Selected/active states
    'selected_bg': '#4a5568',       # Gray for selected items
    'selected_text': '#ffffff',     # White text
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
    
    # Header colors (top bar) - Dark with white text
    theme.css_header_background_color = COLORS['header_bg']
    theme.css_header_text_color = COLORS['header_text']
    theme.css_header_link_color = COLORS['header_text']
    theme.css_header_link_hover_color = COLORS['link_color']
    
    # Module header colors (section headers) - Slightly lighter with white text
    theme.css_module_background_color = COLORS['module_bg']
    theme.css_module_text_color = COLORS['module_text']
    theme.css_module_link_color = COLORS['module_text']
    theme.css_module_link_hover_color = COLORS['link_color']
    theme.css_module_rounded_corners = True
    
    # Module selected (active) colors
    theme.css_module_selected_background_color = COLORS['selected_bg']
    theme.css_module_selected_text_color = COLORS['selected_text']
    
    # Generic link colors - Teal accent
    theme.css_generic_link_color = COLORS['link_color']
    theme.css_generic_link_hover_color = COLORS['link_hover']
    theme.css_generic_link_active_color = COLORS['link_hover']
    
    # Save button colors - Green (professional, indicates success)
    theme.css_save_button_background_color = COLORS['save_btn_bg']
    theme.css_save_button_background_hover_color = COLORS['save_btn_hover']
    theme.css_save_button_text_color = COLORS['save_btn_text']
    
    # Delete button colors - Red (danger)
    theme.css_delete_button_background_color = COLORS['delete_btn_bg']
    theme.css_delete_button_background_hover_color = COLORS['delete_btn_hover']
    theme.css_delete_button_text_color = '#ffffff'
    
    # Related modal settings
    theme.related_modal_active = True
    theme.related_modal_background_color = '#000000'
    theme.related_modal_background_opacity = '0.7'
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
    print("")
    print("🎨 Color Scheme:")
    print(f"   Header:      {COLORS['header_bg']} (dark blue-gray)")
    print(f"   Modules:     {COLORS['module_bg']} (slate gray)")
    print(f"   Text:        White for readability")
    print(f"   Links:       {COLORS['link_color']} (teal accent)")
    print(f"   Save Button: {COLORS['save_btn_bg']} (green)")
    print(f"   Delete:      {COLORS['delete_btn_bg']} (red)")
    print("")
    print("🔄 Restart your Django server to see the changes!")

if __name__ == '__main__':
    setup_theme()
