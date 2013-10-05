---
layout: default
title: Archive
layout: post
---

<div class="archive">
  <ul>
    {% for post in site.posts %}
      <li>
        <h5 class="row">
          <a href="{{ post.url }}" class="large-9 columns">{{ post.title }}</a>
          <span class="date large-3 columns">{{ post.date | date: "%m/%d/%Y" }}</span>
        </h5>
      </li>
    {% endfor %}
  </ul>
</div>