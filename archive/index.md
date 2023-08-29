---
layout: default
title: Archive
---

<div class="archive">
  <ul>
    {% for post in site.posts %}
      <li>
        <article class="row">
          <a href="{{ post.url }}" class="large-9 columns">{{ post.title }}</a>
          <span class="date large-3 columns">{{ post.date | date: "%m/%d/%Y" }}</span>
        </article>
      </li>
    {% endfor %}
  </ul>
</div>