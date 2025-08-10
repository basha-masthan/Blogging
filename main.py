import requests
import random
import lorem  # pip install lorem

# API endpoint for adding a blog (this is your Node.js route)
API_URL = "http://localhost:5000/admin/add"  # Change port if needed

# Random author names
authors = ["Azad", "John Doe", "Sarah Lee", "Michael Chen", "Priya Kapoor"]

# Random keywords pool
keywords_pool = ["javascript", "nodejs", "mongodb", "webdev", "tutorial", "blogging"]

def generate_markdown_blog():
    title = lorem.sentence()
    subtitle = lorem.sentence()
    author = random.choice(authors)

    # Generate markdown content with images & headings
    markdown_content = f"""# {title}

## {subtitle}

![Random Image](https://picsum.photos/800/400)

{lorem.paragraph()}

## Another Section
{lorem.paragraph()}

**Key Takeaways:**
- {lorem.sentence()}
- {lorem.sentence()}
- {lorem.sentence()}
"""

    # Pick random keywords
    keywords = random.sample(keywords_pool, k=3)

    return {
        "title": title,
        "subtitle": subtitle,
        "author": author,
        "markdown": markdown_content,
        "keywords": ", ".join(keywords)
    }

def post_blog(blog_data):
    try:
        response = requests.post(API_URL, data=blog_data)
        if response.status_code == 200:
            print(f"✅ Blog '{blog_data['title']}' posted successfully.")
        else:
            print(f"❌ Failed to post blog. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error posting blog: {e}")

if __name__ == "__main__":
    for _ in range(1):  # Number of blogs to post
        blog = generate_markdown_blog()
        post_blog(blog)
