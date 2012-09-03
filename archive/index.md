---
layout: default
title: Archive
---

{% for post in site.categories.blog %}
<article>
  <div class="post">
    <header>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <span class="date">{{ post.date | date: "%m/%d/%Y" }}</span>
    </header>
  </div>
</article>
{% endfor %}