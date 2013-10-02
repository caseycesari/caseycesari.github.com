---
layout: default
title: Archive
---

<div class="posts">
  <ul>
    {% for post in site.posts %}
      <li>
        <h4 class="row">
          <a href="{{ post.url }}" class="large-9 columns">{{ post.title }}</a>
          <span class="date large-3 columns">{{ post.date | date: "%m/%d/%Y" }}</span>
        </h4>
      </li>
    {% endfor %}
  </ul>
</div>