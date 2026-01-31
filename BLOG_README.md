# Blog Feature Documentation

## Overview
A fully-featured blog system integrated into your portfolio with Django backend (CKEditor for rich text) and Next.js frontend (Avengers theme).

## Features

### Backend (Django)
- ✅ **Rich Text Editor**: CKEditor with code snippet support
- ✅ **Image Uploads**: Featured images and inline content images
- ✅ **SEO Optimization**: Meta descriptions and keywords
- ✅ **Draft/Published Status**: Control post visibility
- ✅ **Categories & Tags**: Organize content
- ✅ **View Counter**: Track post popularity
- ✅ **Auto Slug Generation**: URL-friendly slugs
- ✅ **Admin Actions**: Bulk publish/unpublish

### Frontend (Next.js)
- ✅ **Glassmorphism Cards**: Premium Avengers-themed design
- ✅ **Category Filtering**: Filter posts by category
- ✅ **Responsive Grid**: Mobile-first design
- ✅ **Hover Effects**: Smooth animations
- ✅ **Reading Time**: Estimated read time display
- ✅ **View Count**: Display post views
- ✅ **Tag Display**: Visual tag representation

## API Endpoints

### List All Blog Posts
```
GET /api/blog/
```
Returns all published blog posts ordered by publish date.

### Get Single Blog Post
```
GET /api/blog/{slug}/
```
Returns a single blog post by slug. Increments view count.

### Get Categories
```
GET /api/blog/categories/
```
Returns list of unique blog categories.

### Filter by Category
```
GET /api/blog/by_category/?category=Technology
```
Returns blog posts filtered by category.

## Admin Usage

### Accessing the Admin
1. Navigate to `/admin/`
2. Login with your superuser credentials
3. Click on "Blog Posts" under the API section

### Creating a Blog Post

1. **Basic Information**
   - Title: Your blog post title (slug auto-generates)
   - Author: Default is "Aniket Verma"
   - Category: Choose or create a category
   - Status: Draft or Published

2. **Content**
   - Excerpt: Short description (max 500 chars)
   - Content: Use CKEditor for rich text
     - Bold, Italic, Underline
     - Lists and indentation
     - Links and images
     - Code snippets with syntax highlighting
     - Tables and special characters
   - Featured Image: Upload a cover image

3. **Metadata**
   - Tags: JSON array, e.g., `["Python", "Django", "AI"]`
   - Read Time: Estimated minutes to read

4. **SEO** (Optional)
   - Meta Description: Auto-fills from excerpt
   - Meta Keywords: Comma-separated keywords

5. **Timestamps**
   - Created/Updated: Auto-managed
   - Published At: Set when status is "Published"

### CKEditor Features

The blog uses a custom CKEditor configuration with:
- **Formatting**: Bold, Italic, Underline, Strike
- **Lists**: Numbered and bulleted lists
- **Alignment**: Left, Center, Right, Justify
- **Media**: Images, tables, horizontal rules
- **Code**: Code snippets with syntax highlighting (Monokai theme)
- **Links**: Insert and manage links
- **Styles**: Font family, size, colors

### Bulk Actions

Select multiple posts and use actions:
- **Publish selected posts**: Set status to published
- **Unpublish selected posts**: Set status to draft

## Frontend Integration

The blog is integrated into the main portfolio page:

```typescript
// Automatically fetches and displays blog posts
<Blog data={blogPosts} />
```

### Styling
The blog matches your Avengers theme with:
- Cyan/Blue gradient accents
- Glassmorphism effects
- Smooth hover animations
- Responsive grid layout

## Database Schema

```python
class BlogPost(models.Model):
    title = CharField(max_length=255)
    slug = SlugField(unique=True, auto-generated)
    excerpt = TextField(max_length=500)
    content = RichTextUploadingField()  # CKEditor
    featured_image = ImageField()
    author = CharField(default="Aniket Verma")
    tags = JSONField()  # List of strings
    category = CharField(max_length=100)
    status = CharField(choices=['draft', 'published'])
    read_time = IntegerField(default=5)
    views = IntegerField(default=0)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    published_at = DateTimeField()
    meta_description = CharField(max_length=160)
    meta_keywords = CharField(max_length=255)
```

## File Structure

```
portfolio/
├── api/
│   ├── models.py          # BlogPost model
│   ├── admin.py           # BlogPost admin
│   ├── serializers.py     # Blog serializers
│   ├── views.py           # Blog API views
│   └── urls.py            # Blog endpoints
├── media/                 # Uploaded images
│   └── blog/
│       └── featured/      # Featured images
├── ui/src/
│   ├── components/
│   │   └── Blog.tsx       # Blog component
│   ├── lib/
│   │   ├── api.ts         # Blog API functions
│   │   └── types.ts       # BlogPost interface
│   └── app/
│       └── page.tsx       # Main page with blog
└── seed_blog.py           # Sample blog posts
```

## Quick Start

1. **Create a blog post in admin**:
   ```
   http://localhost:8000/admin/api/blogpost/add/
   ```

2. **View blog posts**:
   - Frontend: `http://localhost:3000/#blog`
   - API: `http://localhost:8000/api/blog/`

3. **Upload images**:
   - Use CKEditor's image button
   - Or set a featured image in admin

## Tips

### Writing Great Blog Posts
1. Use descriptive titles
2. Write compelling excerpts
3. Add relevant tags for discoverability
4. Include code snippets for technical posts
5. Use featured images for visual appeal
6. Set accurate read times

### SEO Best Practices
1. Fill in meta descriptions
2. Use relevant keywords
3. Create descriptive slugs
4. Add alt text to images
5. Use proper heading hierarchy (H2, H3)

### Content Organization
1. Use categories to group related posts
2. Add tags for cross-referencing
3. Keep excerpts concise and engaging
4. Update old posts to keep content fresh

## Troubleshooting

### Images not showing
- Check `MEDIA_URL` and `MEDIA_ROOT` in settings
- Ensure media URLs are configured in `urls.py`
- Verify file permissions on media directory

### CKEditor not loading
- Check that `ckeditor` and `ckeditor_uploader` are in `INSTALLED_APPS`
- Verify CKEditor URLs are included
- Clear browser cache

### Blog posts not appearing
- Ensure status is "Published"
- Check that `published_at` is set
- Verify API endpoint is accessible

## Future Enhancements

Potential features to add:
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] Related posts
- [ ] Search functionality
- [ ] RSS feed
- [ ] Reading progress indicator
- [ ] Author profiles
- [ ] Post series/collections
- [ ] Newsletter integration
- [ ] Analytics dashboard

## Support

For issues or questions:
1. Check Django admin logs
2. Review browser console for frontend errors
3. Verify API responses in Network tab
4. Check Django server logs for backend errors
