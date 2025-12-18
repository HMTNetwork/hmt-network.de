# Blog System Documentation

## How to Add New Blog Posts

To add a new blog post to the HMT Network website, follow these steps:

1. Navigate to the blog administration panel at `/blog/admin/`
2. Fill out the form with the post details:

   - Title: The headline of your blog post
   - Excerpt: A short summary (max 200 characters)
   - Content: The full content of your blog post (will be saved as a separate Markdown file)
   - Author: The author's name
   - Date: Publication date
   - Tags: Optional tags for categorization

3. Click "Eintrag speichern" (Save Entry)
4. Follow the instructions to:
   a. Create a new Markdown file with the post content
   b. Add the generated JSON metadata to the `posts.json` file

## Post Structure

Each blog post consists of two parts:

1. **Metadata** in `posts.json`:

```json
{
  "id": "unique_identifier",
  "title": "Post Title",
  "excerpt": "Short summary of the post",
  "contentFile": "post-filename.md",
  "date": "YYYY-MM-DD",
  "author": "Author Name",
  "tags": ["tag1", "tag2"]
}
```

2. **Content** in a separate Markdown file (`post-filename.md`):

```
Full content of the blog post in Markdown format.
You can use Markdown syntax for formatting, lists, links, etc.
Paragraphs are separated by blank lines.
```

## Editing Existing Posts

To edit an existing post:

1. To modify metadata (title, date, author, tags): Edit the entry in `posts.json`
2. To modify content: Edit the corresponding Markdown file

Be careful not to change the post ID or filename if you want to maintain existing links.

## Deleting Posts

To delete a post:

1. Remove its entry from the `posts.json` file
2. Delete the corresponding Markdown file

Note that this will break any existing links to that post.
